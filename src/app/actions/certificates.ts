'use server';

import { createClient } from '@/lib/supabase/server';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { Certificate, LessonProgress, ProjectProgress, AssessmentAttempt } from '@/types/user';
import { isEligibleForCertification } from '@/lib/assessmentEngine';
import { generateCertificateId, generateVerificationHash } from '@/lib/certificates';
import { computeDynamicTimeframe } from '@/lib/timeframeUtils';
import { revalidatePath } from 'next/cache';

export async function issueCertificate(pathSlug: string): Promise<{
  success: boolean;
  certificate?: Certificate;
  error?: string;
  eligibility?: import('@/types/user').CertificationEligibility;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User must be authenticated to request certification.' };
  }

  const pathObj = getPathBySlug(pathSlug);
  if (!pathObj || !('modules' in pathObj)) {
    return { success: false, error: 'Course path not found.' };
  }
  const path = pathObj as Path;

  // 1. Check for existing certificate (Idempotency)
  const { data: existingCert } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug)
    .eq('certificate_status', 'issued')
    .maybeSingle();

  if (existingCert) {
    return { success: true, certificate: existingCert as Certificate };
  }

  // 2. Fetch user progress records for eligibility evaluation & earliest activity tracking
  const { data: progressRecords } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id);
  const { data: projectRecords } = await supabase
    .from('project_progress')
    .select('*')
    .eq('user_id', user.id);
  const { data: assessmentAttempts } = await supabase
    .from('assessment_attempts')
    .select('*')
    .eq('user_id', user.id);

  const projectMap: Record<string, ProjectProgress> = (projectRecords || []).reduce((acc, p) => {
    acc[p.project_slug] = p as ProjectProgress;
    return acc;
  }, {} as Record<string, ProjectProgress>);

  const attemptsList = (assessmentAttempts || []) as AssessmentAttempt[];

  // 3. Evaluate eligibility on trusted server
  const eligibility = isEligibleForCertification(
    path,
    (progressRecords || []) as LessonProgress[],
    projectMap,
    attemptsList
  );

  if (!eligibility.eligible || path.certificationRequirement?.certificationStatus === 'development' || !path.certificationRequirement?.certificateEnabled) {
    return {
      success: false,
      error: path.certificationRequirement?.developmentReason || eligibility.reasons.join(' ') || 'Certification requirements not satisfied.',
      eligibility,
    };
  }

  // 4. Fetch learner profile & institution details
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, email, institution_name, student_id')
    .eq('id', user.id)
    .maybeSingle();

  const learnerName =
    profile?.display_name ||
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Student Name';

  const institutionName =
    (profile as { institution_name?: string } | null)?.institution_name ||
    user.user_metadata?.institution_name ||
    user.user_metadata?.college ||
    'Institution Name';

  const studentId =
    (profile as { student_id?: string } | null)?.student_id ||
    user.user_metadata?.student_id ||
    `STU-${user.id.slice(0, 8).toUpperCase()}`;

  // Find student's earliest activity date for this path slug to calculate actual completion duration & timeframe
  const pathProgressRecords = (progressRecords || []).filter((p) => p.path_slug === pathSlug);
  let firstActivityDate: string | null = null;
  if (pathProgressRecords.length > 0) {
    const dates = pathProgressRecords
      .map((p) => p.last_accessed_at || p.completed_at)
      .filter(Boolean)
      .sort();
    if (dates.length > 0) {
      firstActivityDate = dates[0];
    }
  }

  const completionDate = new Date();
  const timeframe = computeDynamicTimeframe(firstActivityDate, completionDate, path.estimatedHours);

  // 5. Generate Certificate ID & Verification Hash
  const certificateId = generateCertificateId(pathSlug);
  const issuedAt = completionDate.toISOString();
  const verificationHash = generateVerificationHash(certificateId, user.id, pathSlug, issuedAt);

  // 6. Insert Certificate into DB
  const { data: inserted, error: insertErr } = await supabase
    .from('certificates')
    .insert({
      certificate_id: certificateId,
      user_id: user.id,
      path_slug: pathSlug,
      course_title: path.title,
      learner_name: learnerName,
      issued_at: issuedAt,
      final_score: eligibility.scorePercentage,
      mastery_percentage: eligibility.scorePercentage,
      certificate_status: 'issued',
      verification_hash: verificationHash,
      metadata: {
        skillsCovered: path.certificationRequirement?.skillsCovered || [],
        lessonsCompleted: eligibility.lessonsCompletedCount,
        projectsCompleted: eligibility.projectsCompletedCount,
        institutionName,
        studentId,
        duration: timeframe.duration,
        startDate: timeframe.startDate,
        endDate: timeframe.endDate,
        periodText: timeframe.periodText,
      },
    })
    .select('*')
    .single();

  if (insertErr || !inserted) {
    console.error('[Certificate Action Error]', insertErr);
    return { success: false, error: insertErr?.message || 'Failed to issue certificate record.' };
  }

  // 7. Audit Log
  await supabase.from('certificate_audit_logs').insert({
    certificate_id: certificateId,
    action: 'issued',
    actor_id: user.id,
    reason: 'Initial certification requirement fulfillment',
  });

  revalidatePath('/dashboard');
  revalidatePath(`/paths/${pathSlug}`);

  return { success: true, certificate: inserted as Certificate };
}

export async function fetchUserCertificates(): Promise<Certificate[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false });

  if (error || !data) return [];
  return data as Certificate[];
}

export async function verifyCertificatePublic(certificateId: string): Promise<Certificate | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .or(`certificate_id.eq.${certificateId},verification_hash.eq.${certificateId}`)
    .maybeSingle();

  if (error || !data) return null;
  return data as Certificate;
}

export async function revokeCertificate(certificateId: string, reason: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized: User must be authenticated to perform revocation.' };
  }

  // Verify certificate exists and user ownership or authorization
  const { data: cert } = await supabase
    .from('certificates')
    .select('user_id')
    .eq('certificate_id', certificateId)
    .maybeSingle();

  if (!cert) {
    return { success: false, error: 'Certificate record not found.' };
  }

  if (cert.user_id !== user.id) {
    return { success: false, error: 'Forbidden: You cannot revoke a certificate belonging to another learner.' };
  }

  const { error } = await supabase
    .from('certificates')
    .update({ certificate_status: 'revoked', revocation_reason: reason })
    .eq('certificate_id', certificateId);

  if (error) return { success: false, error: error.message };

  await supabase.from('certificate_audit_logs').insert({
    certificate_id: certificateId,
    action: 'revoked',
    actor_id: user.id,
    reason,
  });

  revalidatePath(`/verify/${certificateId}`);
  return { success: true };
}
