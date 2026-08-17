'use server';

import { createClient } from '@/lib/supabase/server';
import { LearnerAnalyticsReport, RecentActivityItem, LessonProgress, ProjectProgress, AssessmentAttempt, Certificate } from '@/types/user';
import { calculateLearnerAnalytics } from '@/lib/analytics';
import { pythonPath } from '@/content/python-path';
import { Path } from '@/types/content';
import { revalidatePath } from 'next/cache';

export async function getUserAnalyticsReport(): Promise<LearnerAnalyticsReport | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Parallel data fetching for performance
  const [
    { data: profile },
    { data: progressRecords },
    { data: projectRecords },
    { data: assessmentAttempts },
    { data: certificates },
    { data: activities },
  ] = await Promise.all([
    supabase.from('profiles').select('streak_count, last_active_date').eq('id', user.id).maybeSingle(),
    supabase.from('user_progress').select('*').eq('user_id', user.id),
    supabase.from('project_progress').select('*').eq('user_id', user.id),
    supabase.from('assessment_attempts').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('certificates').select('*').eq('user_id', user.id).order('issued_at', { ascending: false }),
    supabase.from('user_activities').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
  ]);

  // Construct recent activity timeline from user_activities table or fallback to compiled events
  const activityList: RecentActivityItem[] = [];

  if (activities && activities.length > 0) {
    activities.forEach((act) => {
      activityList.push({
        id: act.id,
        type: act.activity_type as RecentActivityItem['type'],
        title: act.title,
        timestamp: act.created_at,
        pathSlug: act.path_slug,
        lessonSlug: act.metadata?.lesson_slug as string | undefined,
        projectSlug: act.metadata?.project_slug as string | undefined,
      });
    });
  } else {
    // Compile fallbacks from lesson/project progress if user_activities table is newly created
    for (const rec of (progressRecords || [])) {
      if (rec.completed_at && rec.status === 'completed') {
        const lessonObj = (pythonPath as Path).modules.flatMap((m) => m.lessons).find((l) => l.slug === rec.lesson_slug);
        activityList.push({
          id: `completed-${rec.id || rec.lesson_slug}`,
          type: 'lesson_completed',
          title: `Completed lesson: ${lessonObj?.title || rec.lesson_slug}`,
          timestamp: rec.completed_at,
          lessonSlug: rec.lesson_slug,
          pathSlug: rec.path_slug,
        });
      }
    }

    for (const projRec of (projectRecords || [])) {
      if (projRec.completed_at && projRec.status === 'completed') {
        activityList.push({
          id: `proj-completed-${projRec.project_slug}`,
          type: 'project_completed',
          title: `Completed project: ${projRec.project_slug}`,
          timestamp: projRec.completed_at,
          projectSlug: projRec.project_slug,
          pathSlug: projRec.path_slug,
        });
      }
    }

    for (const att of (assessmentAttempts || [])) {
      if (att.submitted_at) {
        activityList.push({
          id: `att-${att.id}`,
          type: att.passed ? 'assessment_passed' : 'exercise_attempted',
          title: att.passed ? `Passed assessment: ${att.assessment_id}` : `Attempted assessment: ${att.assessment_id}`,
          timestamp: att.submitted_at,
          pathSlug: att.path_slug,
        });
      }
    }

    activityList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  return calculateLearnerAnalytics(
    (progressRecords || []) as LessonProgress[],
    (projectRecords || []) as ProjectProgress[],
    (assessmentAttempts || []) as AssessmentAttempt[],
    (certificates || []) as Certificate[],
    profile?.streak_count || 1,
    activityList.slice(0, 15)
  );
}

export async function logUserActivity(
  pathSlug: string,
  activityType: string,
  title: string,
  metadata?: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not authenticated' };
  }

  const { error } = await supabase.from('user_activities').insert({
    user_id: user.id,
    path_slug: pathSlug,
    activity_type: activityType,
    title,
    metadata: metadata || {},
  });

  if (error) {
    console.error('[Activity Log Error]:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/progress');
  return { success: true };
}
