'use server';

import { createClient } from '@/lib/supabase/server';
import { getAssessmentBySlug } from '@/content/assessments-data';
import { calculateAssessmentScore } from '@/lib/assessmentEngine';
import { AssessmentAttempt } from '@/types/user';
import { revalidatePath } from 'next/cache';

export async function submitAssessmentAttempt(
  pathSlug: string,
  assessmentSlug: string,
  answers: Record<string, unknown>,
  durationSeconds: number
): Promise<{ success: boolean; result?: AssessmentAttempt; error?: string }> {
  if (!pathSlug || typeof pathSlug !== 'string' || !assessmentSlug || typeof assessmentSlug !== 'string') {
    return { success: false, error: 'Invalid assessment input parameters.' };
  }

  const safeDuration = typeof durationSeconds === 'number' && !isNaN(durationSeconds) && durationSeconds >= 0 ? durationSeconds : 0;
  const safeAnswers = answers && typeof answers === 'object' ? answers : {};

  const assessment = getAssessmentBySlug(assessmentSlug);
  if (!assessment) {
    return { success: false, error: 'Assessment not found' };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is authenticated, check existing attempt count
  let attemptNumber = 1;
  if (user) {
    const { count } = await supabase
      .from('assessment_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('assessment_id', assessment.id);

    attemptNumber = (count || 0) + 1;
  }

  // Calculate score securely on server
  const scoreResult = calculateAssessmentScore(assessment, safeAnswers, safeDuration, attemptNumber);

  if (user) {
    const { data: inserted, error: insertErr } = await supabase
      .from('assessment_attempts')
      .insert({
        user_id: user.id,
        path_slug: pathSlug,
        assessment_id: assessment.id,
        assessment_slug: assessment.slug,
        attempt_number: attemptNumber,
        started_at: scoreResult.started_at,
        submitted_at: scoreResult.submitted_at,
        duration_seconds: durationSeconds,
        score: scoreResult.score,
        max_score: scoreResult.max_score,
        percentage: scoreResult.percentage,
        passed: scoreResult.passed,
        answers: scoreResult.answers,
        question_results: scoreResult.question_results,
      })
      .select('*')
      .single();

    if (insertErr) {
      console.error('[Assessment Server Action Error]', insertErr);
    } else if (inserted) {
      revalidatePath('/dashboard');
      revalidatePath(`/paths/${pathSlug}/assessments/${assessmentSlug}`);
      return { success: true, result: inserted as AssessmentAttempt };
    }
  }

  return { success: true, result: scoreResult as AssessmentAttempt };
}

export async function fetchAssessmentHistory(
  pathSlug: string,
  assessmentSlug: string
): Promise<AssessmentAttempt[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('assessment_attempts')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug)
    .eq('assessment_slug', assessmentSlug)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as AssessmentAttempt[];
}

export async function fetchUserAssessmentAttempts(): Promise<AssessmentAttempt[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('assessment_attempts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as AssessmentAttempt[];
}
