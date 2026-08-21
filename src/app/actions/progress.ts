'use server';

import { createClient } from '@/lib/supabase/server';
import { LessonProgress, ExerciseSubmission, DashboardStats } from '@/types/user';
import { pythonPath } from '@/content/python-path';
import { Path } from '@/types/content';
import { revalidatePath } from 'next/cache';

function logSupabaseError(opName: string, error: unknown, userExists: boolean) {
  if (error && typeof error === 'object') {
    const errObj = error as { code?: string; message?: string; details?: string; hint?: string };
    console.error(`[Supabase Diagnostic] ${opName}:`, {
      operation: opName,
      code: errObj.code || 'UNKNOWN',
      message: errObj.message || 'No message',
      details: errObj.details || null,
      hint: errObj.hint || null,
      userExists,
    });
  } else if (error) {
    console.error(`[Supabase Diagnostic] ${opName}:`, {
      operation: opName,
      error: String(error),
      userExists,
    });
  }
}

async function ensureUserProfile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string; user_metadata?: { display_name?: string } }
) {
  try {
    const { data: profile, error: selectErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (selectErr) {
      logSupabaseError('ensureUserProfile:select', selectErr, true);
    }

    if (!profile) {
      const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Learner';
      const { error: insertErr } = await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email || '',
        display_name: displayName,
        updated_at: new Date().toISOString(),
      });

      if (insertErr) {
        logSupabaseError('ensureUserProfile:insert', insertErr, true);
      }
    }
  } catch (err) {
    logSupabaseError('ensureUserProfile:catch', err, true);
  }
}

export async function fetchPathProgress(pathSlug: string): Promise<Record<string, LessonProgress>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {};
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug);

  if (error) {
    logSupabaseError('fetchPathProgress', error, true);
    return {};
  }

  if (!data) {
    return {};
  }

  const map: Record<string, LessonProgress> = {};
  data.forEach((row) => {
    map[row.lesson_slug] = row as LessonProgress;
  });

  return map;
}

export async function fetchLessonProgress(pathSlug: string, lessonSlug: string): Promise<LessonProgress | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug)
    .eq('lesson_slug', lessonSlug)
    .maybeSingle();

  if (error) {
    logSupabaseError('fetchLessonProgress', error, true);
    return null;
  }

  if (!data) {
    return null;
  }

  return data as LessonProgress;
}

export async function saveLessonProgress(
  pathSlug: string,
  lessonSlug: string,
  progress: Partial<LessonProgress>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    logSupabaseError('saveLessonProgress:noUser', 'User not authenticated', false);
    return { success: false, error: 'User not authenticated' };
  }

  await ensureUserProfile(supabase, user);

  // Fetch existing record first
  const { data: existing, error: fetchErr } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug)
    .eq('lesson_slug', lessonSlug)
    .maybeSingle();

  if (fetchErr) {
    logSupabaseError('saveLessonProgress:fetchExisting', fetchErr, true);
  }

  const conceptsCompleted = progress.concepts_completed ?? existing?.concepts_completed ?? false;
  const quizCompleted = progress.quiz_completed ?? existing?.quiz_completed ?? false;
  const exerciseCompleted = progress.exercise_completed ?? existing?.exercise_completed ?? false;

  // Lesson status calculation
  let status: 'not_started' | 'in_progress' | 'completed' = 'in_progress';
  if (exerciseCompleted || (conceptsCompleted && quizCompleted)) {
    status = 'completed';
  }

  const payload = {
    user_id: user.id,
    path_slug: pathSlug,
    lesson_slug: lessonSlug,
    status,
    concepts_completed: conceptsCompleted,
    quiz_completed: quizCompleted,
    quiz_score: progress.quiz_score ?? existing?.quiz_score ?? 0,
    quiz_total: progress.quiz_total ?? existing?.quiz_total ?? 0,
    exercise_completed: exerciseCompleted,
    last_code_submitted: progress.last_code_submitted ?? existing?.last_code_submitted ?? null,
    last_accessed_at: new Date().toISOString(),
    completed_at: status === 'completed' ? (existing?.completed_at || new Date().toISOString()) : null,
  };

  const { error } = await supabase
    .from('user_progress')
    .upsert(payload, { onConflict: 'user_id,path_slug,lesson_slug' });

  if (error) {
    logSupabaseError('saveLessonProgress:upsert', error, true);
    return { success: false, error: error.message };
  }

  if (status === 'completed' && existing?.status !== 'completed') {
    const { logUserActivity } = await import('@/app/actions/analytics');
    await logUserActivity(
      pathSlug,
      'lesson_completed',
      `Completed lesson: ${lessonSlug}`,
      { lesson_slug: lessonSlug }
    );
  }

  // Update profile last_active_date and streak
  const todayStr = new Date().toISOString().split('T')[0];
  const { data: profile, error: selectProfileErr } = await supabase
    .from('profiles')
    .select('last_active_date, streak_count')
    .eq('id', user.id)
    .maybeSingle();

  if (selectProfileErr) {
    logSupabaseError('saveLessonProgress:selectProfile', selectProfileErr, true);
  }

  if (profile) {
    const { calculateUpdatedStreak } = await import('@/lib/streak');
    const updatedStreak = calculateUpdatedStreak({
      streak_count: profile.streak_count || 0,
      last_active_date: profile.last_active_date || null,
    }, todayStr);

    const { error: updateProfileErr } = await supabase
      .from('profiles')
      .update({
        last_active_date: updatedStreak.last_active_date,
        streak_count: updatedStreak.streak_count,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateProfileErr) {
      logSupabaseError('saveLessonProgress:updateProfile', updateProfileErr, true);
    }
  }

  revalidatePath('/dashboard');
  revalidatePath(`/paths/${pathSlug}`);
  return { success: true };
}

export async function recordExerciseSubmission(
  submission: Omit<ExerciseSubmission, 'id' | 'user_id' | 'created_at'>
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    logSupabaseError('recordExerciseSubmission:noUser', 'User not authenticated', false);
    return { success: false, error: 'User not authenticated' };
  }

  await ensureUserProfile(supabase, user);

  const { error } = await supabase
    .from('exercise_submissions')
    .insert({
      user_id: user.id,
      path_slug: submission.path_slug,
      lesson_slug: submission.lesson_slug,
      exercise_id: submission.exercise_id,
      submitted_code: submission.submitted_code,
      passed: submission.passed,
      test_results: submission.test_results || null,
      execution_time_ms: submission.execution_time_ms || 0,
    });

  if (error) {
    logSupabaseError('recordExerciseSubmission:insert', error, true);
    return { success: false, error: error.message };
  }

  if (submission.passed) {
    await saveLessonProgress(submission.path_slug, submission.lesson_slug, {
      exercise_completed: true,
      last_code_submitted: submission.submitted_code,
    });
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function migrateGuestProgress(guestProgressList: LessonProgress[]): Promise<{ success: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !guestProgressList.length) {
    return { success: true };
  }

  await ensureUserProfile(supabase, user);

  for (const item of guestProgressList) {
    const { error } = await supabase.from('user_progress').upsert({
      user_id: user.id,
      path_slug: item.path_slug,
      lesson_slug: item.lesson_slug,
      status: item.status || 'completed',
      concepts_completed: item.concepts_completed || false,
      quiz_completed: item.quiz_completed || false,
      quiz_score: item.quiz_score || 0,
      quiz_total: item.quiz_total || 0,
      exercise_completed: item.exercise_completed || false,
      last_code_submitted: item.last_code_submitted || null,
      last_accessed_at: new Date().toISOString(),
      completed_at: item.completed_at || new Date().toISOString(),
    }, { onConflict: 'user_id,path_slug,lesson_slug' });

    if (error) {
      logSupabaseError('migrateGuestProgress:upsert', error, true);
    }
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function fetchProjectProgress(pathSlug: string, projectSlug: string): Promise<import('@/types/user').ProjectProgress | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('project_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('path_slug', pathSlug)
    .eq('project_slug', projectSlug)
    .maybeSingle();

  if (error) {
    logSupabaseError('fetchProjectProgress', error, true);
    return null;
  }

  if (!data) {
    return null;
  }

  return data as import('@/types/user').ProjectProgress;
}

export async function saveProjectProgress(
  pathSlug: string,
  projectSlug: string,
  completedMilestones: string[],
  totalMilestones: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    logSupabaseError('saveProjectProgress:noUser', 'User not authenticated', false);
    return { success: false, error: 'User not authenticated' };
  }

  await ensureUserProfile(supabase, user);

  const progressPercent = totalMilestones > 0
    ? Math.round((completedMilestones.length / totalMilestones) * 100)
    : 0;

  const isCompleted = totalMilestones > 0 && completedMilestones.length >= totalMilestones;
  const status: 'not_started' | 'in_progress' | 'completed' = isCompleted
    ? 'completed'
    : (completedMilestones.length > 0 ? 'in_progress' : 'not_started');

  const { error } = await supabase
    .from('project_progress')
    .upsert({
      user_id: user.id,
      path_slug: pathSlug,
      project_slug: projectSlug,
      status,
      completed_milestones: completedMilestones,
      progress_percent: progressPercent,
      completed_at: isCompleted ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,path_slug,project_slug' });

  if (error) {
    logSupabaseError('saveProjectProgress:upsert', error, true);
    return { success: false, error: error.message };
  }

  if (isCompleted) {
    const { logUserActivity } = await import('@/app/actions/analytics');
    await logUserActivity(
      pathSlug,
      'project_completed',
      `Completed project: ${projectSlug}`,
      { project_slug: projectSlug }
    );
  }

  revalidatePath('/dashboard');
  revalidatePath(`/paths/${pathSlug}`);
  return { success: true };
}

export async function migrateGuestProjects(guestProjectsList: import('@/types/user').ProjectProgress[]): Promise<{ success: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !guestProjectsList.length) {
    return { success: true };
  }

  await ensureUserProfile(supabase, user);

  for (const item of guestProjectsList) {
    const { error } = await supabase.from('project_progress').upsert({
      user_id: user.id,
      path_slug: item.path_slug,
      project_slug: item.project_slug,
      status: item.status || 'not_started',
      completed_milestones: item.completed_milestones || [],
      progress_percent: item.progress_percent || 0,
      completed_at: item.completed_at || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,path_slug,project_slug' });

    if (error) {
      logSupabaseError('migrateGuestProjects:upsert', error, true);
    }
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function getUserDashboardData(): Promise<DashboardStats | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch all dashboard data concurrently for optimal performance
  const [
    { data: profile },
    { data: progressRecords },
    { data: projectRecords },
    { data: achievementRecords },
    { data: submissions },
    { data: assessmentAttempts },
    { data: userCertificates },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('streak_count, last_active_date')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id),
    supabase
      .from('project_progress')
      .select('*')
      .eq('user_id', user.id),
    supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id),
    supabase
      .from('exercise_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('assessment_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .order('issued_at', { ascending: false }),
  ]);

  const achievementMap: Record<string, string> = (achievementRecords || []).reduce((acc, a) => {
    acc[a.achievement_id] = a.unlocked_at;
    return acc;
  }, {} as Record<string, string>);

  const completedLessons = (progressRecords || []).filter(r => r.status === 'completed');
  const solvedExercises = (progressRecords || []).filter(r => r.exercise_completed);
  const quizzesTaken = (progressRecords || []).filter(r => r.quiz_completed);

  const projectProgressMap: Record<string, import('@/types/user').ProjectProgress> = (projectRecords || []).reduce((acc, p) => {
    acc[p.project_slug] = p as import('@/types/user').ProjectProgress;
    return acc;
  }, {} as Record<string, import('@/types/user').ProjectProgress>);

  const completedProjectsList = Object.values(projectProgressMap).filter(p => p.status === 'completed');
  const inProgressProjectsList = Object.values(projectProgressMap).filter(p => p.status === 'in_progress');
  
  const totalQuizCorrect = quizzesTaken.reduce((sum, r) => sum + (r.quiz_score || 0), 0);
  const totalQuizPossible = quizzesTaken.reduce((sum, r) => sum + (r.quiz_total || 0), 0);
  const quizAccuracyPercentage = totalQuizPossible > 0 
    ? Math.round((totalQuizCorrect / totalQuizPossible) * 100)
    : 0;

  // Mastery calculation
  const { calculateMastery } = await import('@/lib/mastery');
  const mastery = calculateMastery(pythonPath as Path, (progressRecords || []) as LessonProgress[], projectProgressMap);

  // Next activity calculation & multi-course path progress
  const { getNextActivity, calculatePathProgress } = await import('@/lib/progressUtils');
  const { getActivePaths, getPathBySlug } = await import('@/content');
  const nextRecommendedActivity = getNextActivity('python', (progressRecords || []) as LessonProgress[], projectProgressMap);
  
  const activeCourseObjects = getActivePaths()
    .map(p => getPathBySlug(p.slug))
    .filter((p): p is Path => !!p && 'modules' in p);

  const pathProgress = activeCourseObjects.map(courseObj => {
    const stats = calculatePathProgress(courseObj, (progressRecords || []) as LessonProgress[]);
    return {
      pathSlug: stats.pathSlug,
      title: stats.title,
      totalLessons: stats.totalLessons,
      completedLessons: stats.completedLessons,
      percentage: stats.percentage,
      nextLesson: stats.nextLesson && !stats.nextLesson.isPathCompleted ? {
        lessonSlug: stats.nextLesson.lessonSlug,
        title: stats.nextLesson.lessonTitle,
        moduleTitle: stats.nextLesson.moduleTitle,
      } : null,
    };
  });

  // Construct real recent activity timeline
  const activityList: import('@/types/user').RecentActivityItem[] = [];

  for (const rec of progressRecords || []) {
    if (rec.completed_at && rec.status === 'completed') {
      const lessonObj = (pythonPath as Path).modules.flatMap(m => m.lessons).find(l => l.slug === rec.lesson_slug);
      activityList.push({
        id: `completed-${rec.id || rec.lesson_slug}`,
        type: 'lesson_completed',
        title: `Completed ${lessonObj?.title || rec.lesson_slug}`,
        timestamp: rec.completed_at,
        lessonSlug: rec.lesson_slug,
        pathSlug: rec.path_slug,
      });
    }
  }

  for (const projRec of Object.values(projectProgressMap)) {
    if (projRec.completed_at && projRec.status === 'completed') {
      const projObj = (pythonPath as Path).projects?.find(p => p.slug === projRec.project_slug);
      activityList.push({
        id: `proj-completed-${projRec.project_slug}`,
        type: 'project_completed',
        title: `Completed project: ${projObj?.title || projRec.project_slug}`,
        timestamp: projRec.completed_at,
        projectSlug: projRec.project_slug,
        pathSlug: projRec.path_slug,
      });
    }
  }

  for (const sub of submissions || []) {
    const lessonObj = (pythonPath as Path).modules.flatMap(m => m.lessons).find(l => l.slug === sub.lesson_slug);
    activityList.push({
      id: `sub-${sub.id}`,
      type: sub.passed ? 'exercise_passed' : 'exercise_attempted',
      title: sub.passed ? `Passed exercise: ${lessonObj?.title || sub.lesson_slug}` : `Attempted exercise: ${lessonObj?.title || sub.lesson_slug}`,
      timestamp: sub.created_at || new Date().toISOString(),
      lessonSlug: sub.lesson_slug,
      pathSlug: sub.path_slug,
    });
  }

  activityList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Evaluate achievements
  const { evaluateAchievements } = await import('@/lib/achievements');
  const achievements = evaluateAchievements(
    pythonPath as Path,
    (progressRecords || []) as LessonProgress[],
    projectProgressMap,
    profile?.streak_count || 1,
    achievementMap
  );

  const attemptsList = (assessmentAttempts || []) as import('@/types/user').AssessmentAttempt[];

  // Certification eligibility evaluation for active courses
  const { isEligibleForCertification } = await import('@/lib/assessmentEngine');
  const certificationEligibilityMap: Record<string, import('@/types/user').CertificationEligibility> = {};
  for (const courseObj of activeCourseObjects) {
    certificationEligibilityMap[courseObj.slug] = isEligibleForCertification(
      courseObj,
      (progressRecords || []) as LessonProgress[],
      projectProgressMap,
      attemptsList
    );
  }

  return {
    totalLessonsCompleted: completedLessons.length,
    totalExercisesSolved: solvedExercises.length,
    totalQuizzesTaken: quizzesTaken.length,
    totalProjectsCompleted: completedProjectsList.length,
    projectsInProgressCount: inProgressProjectsList.length,
    quizAccuracyPercentage,
    currentStreakDays: profile?.streak_count || 1,
    lastActiveDate: profile?.last_active_date || null,
    mastery,
    nextRecommendedActivity,
    pathProgress,
    recentSubmissions: (submissions || []) as ExerciseSubmission[],
    recentActivity: activityList.slice(0, 10),
    achievements,
    projectProgressMap,
    recentAssessmentAttempts: attemptsList,
    certificationEligibilityMap,
    userCertificates: (userCertificates || []) as import('@/types/user').Certificate[],
  };
}

