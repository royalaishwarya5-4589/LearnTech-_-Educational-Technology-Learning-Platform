import { Path, Lesson } from '@/types/content';
import {
  LessonProgress,
  ProjectProgress,
  AssessmentAttempt,
  Certificate,
  LearnerAnalyticsReport,
  CourseAnalytics,
  AssessmentAnalytics,
  RecentActivityItem,
  CertificationEligibility,
} from '@/types/user';
import { getActivePaths, getPathBySlug } from '@/content';
import { getCertificationPolicy } from '@/content/certification-policies';
import { isEligibleForCertification } from '@/lib/assessmentEngine';
import { calculatePathProgress } from '@/lib/progressUtils';
import { calculateMastery } from '@/lib/mastery';

/**
 * Calculates complete, authentic learner analytics derived from actual stored database records.
 */
export function calculateLearnerAnalytics(
  progressRecords: LessonProgress[],
  projectRecords: ProjectProgress[],
  assessmentAttempts: AssessmentAttempt[],
  certificates: Certificate[],
  streakCount: number = 1,
  recentActivities: RecentActivityItem[] = []
): LearnerAnalyticsReport {
  const activeCourseObjects = getActivePaths()
    .map((p) => getPathBySlug(p.slug))
    .filter((p): p is Path => !!p && 'modules' in p);

  // Group project records by project slug
  const projectMap: Record<string, ProjectProgress> = projectRecords.reduce((acc, proj) => {
    acc[proj.project_slug] = proj;
    return acc;
  }, {} as Record<string, ProjectProgress>);

  let totalLessonsCompleted = 0;
  let totalExercisesCompleted = 0;
  let coursesStartedCount = 0;
  let coursesCompletedCount = 0;

  // Process per-course analytics
  const courseAnalyticsList: CourseAnalytics[] = activeCourseObjects.map((courseObj) => {
    const policy = getCertificationPolicy(courseObj.slug);
    const pathStats = calculatePathProgress(courseObj, progressRecords);
    const masteryStats = calculateMastery(courseObj, progressRecords, projectMap);

    const isStarted = pathStats.completedLessons > 0 || pathStats.moduleStats.some((m) => m.completedLessons > 0);
    const isCompleted = pathStats.completedLessons >= pathStats.totalLessons && pathStats.totalLessons > 0;

    if (isStarted) coursesStartedCount++;
    if (isCompleted) coursesCompletedCount++;

    totalLessonsCompleted += pathStats.completedLessons;

    // Calculate exercises for this path
    const pathLessons = courseObj.modules.flatMap((m) => m.lessons);
    const totalPathExercises = pathLessons.filter((l: Lesson) => !!l.exercise).length;
    const completedPathExercises = progressRecords.filter((rec) => {
      if (rec.path_slug !== courseObj.slug) return false;
      return rec.exercise_completed;
    }).length;

    totalExercisesCompleted += completedPathExercises;

    // Calculate projects for this path
    const totalPathProjects = courseObj.projects?.length || 0;
    const completedPathProjects = (courseObj.projects || []).filter((proj) => {
      const rec = projectMap[proj.slug];
      return rec?.status === 'completed';
    }).length;

    // Assessment attempts for this path
    const courseAttempts = assessmentAttempts.filter((att) => att.path_slug === courseObj.slug);
    const bestScore = courseAttempts.length > 0
      ? Math.max(...courseAttempts.map((att) => att.percentage))
      : null;

    // Certification Eligibility
    const eligibility: CertificationEligibility = isEligibleForCertification(
      courseObj,
      progressRecords,
      projectMap,
      assessmentAttempts
    );

    // Certificate issued check
    const issuedCert = certificates.find((c) => c.path_slug === courseObj.slug && c.certificate_status === 'issued');

    let certificationStatus: 'eligible' | 'issued' | 'not_eligible' | 'in_development' = 'not_eligible';
    if (policy.certificationStatus === 'development') {
      certificationStatus = 'in_development';
    } else if (issuedCert) {
      certificationStatus = 'issued';
    } else if (eligibility.eligible) {
      certificationStatus = 'eligible';
    }

    return {
      pathSlug: courseObj.slug,
      title: courseObj.title,
      readinessState: policy.certificationStatus,
      progressPercentage: pathStats.percentage,
      completedLessons: pathStats.completedLessons,
      totalLessons: pathStats.totalLessons,
      completedExercises: completedPathExercises,
      totalExercises: totalPathExercises,
      completedProjects: completedPathProjects,
      requiredProjects: totalPathProjects,
      masteryPercentage: masteryStats.overallPercentage,
      assessmentsAttempted: courseAttempts.length,
      bestAssessmentScore: bestScore,
      certificationStatus,
      certificationEligibility: eligibility,
    };
  });

  // Group assessment attempts by assessment_id to accurately distinguish attempts vs unique assessments
  const assessmentGroups: Record<string, AssessmentAttempt[]> = {};
  for (const attempt of assessmentAttempts) {
    if (!assessmentGroups[attempt.assessment_id]) {
      assessmentGroups[attempt.assessment_id] = [];
    }
    assessmentGroups[attempt.assessment_id].push(attempt);
  }

  const assessmentAnalyticsList: AssessmentAnalytics[] = Object.entries(assessmentGroups).map(([assessId, attempts]) => {
    attempts.sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime());
    const latestAttempt = attempts[attempts.length - 1];
    const pathObj = getPathBySlug(latestAttempt.path_slug);

    const scores = attempts.map((a) => a.percentage);
    const bestScore = Math.max(...scores);
    const latestScore = latestAttempt.percentage;
    const averageScore = Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);

    const passedCount = attempts.filter((a) => a.passed).length;
    const failedCount = attempts.filter((a) => !a.passed).length;

    const durations = attempts.map((a) => a.duration_seconds).filter((d) => d > 0);
    const bestDurationSeconds = durations.length > 0 ? Math.min(...durations) : null;

    // Capitalize assessment slug/id for title formatting
    const title = assessId
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      assessmentId: assessId,
      assessmentTitle: title,
      pathSlug: latestAttempt.path_slug,
      pathTitle: pathObj?.title || latestAttempt.path_slug,
      totalAttempts: attempts.length,
      bestScore,
      latestScore,
      averageScore,
      passedCount,
      failedCount,
      bestDurationSeconds,
      history: attempts,
    };
  });

  // Total projects completed across all courses
  const totalProjectsCompleted = Object.values(projectMap).filter((p) => p.status === 'completed').length;

  // Passed assessments count
  const passedAssessmentsCount = assessmentAnalyticsList.filter((a) => a.passedCount > 0).length;

  // Average assessment score across all attempts
  const allScores = assessmentAttempts.map((a) => a.percentage);
  const averageAssessmentScore = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : null;

  // Overall platform mastery
  const startedCourses = courseAnalyticsList.filter(
    (c) => c.completedLessons > 0 || c.completedProjects > 0 || c.assessmentsAttempted > 0
  );
  const targetMasteries = startedCourses.length > 0
    ? startedCourses.map((c) => c.masteryPercentage)
    : courseAnalyticsList.map((c) => c.masteryPercentage);

  const overallMasteryPercentage = targetMasteries.length > 0
    ? Math.round(targetMasteries.reduce((a, b) => a + b, 0) / targetMasteries.length)
    : 0;

  return {
    totalCoursesStarted: coursesStartedCount,
    totalCoursesCompleted: coursesCompletedCount,
    totalLessonsCompleted,
    totalExercisesCompleted,
    totalProjectsCompleted,
    totalAssessmentAttempts: assessmentAttempts.length,
    uniqueAssessmentsAttempted: Object.keys(assessmentGroups).length,
    passedAssessmentsCount,
    certificatesEarnedCount: certificates.filter((c) => c.certificate_status === 'issued').length,
    currentStreak: streakCount,
    longestStreak: streakCount, // can be derived from profile or equal to current if not tracked separately
    overallMasteryPercentage,
    averageAssessmentScore,
    courses: courseAnalyticsList,
    assessments: assessmentAnalyticsList,
    recentActivities,
  };
}
