import { LessonProgress, ProjectProgress, MasteryBreakdown } from '@/types/user';
import { Path, Lesson } from '@/types/content';

/**
 * Calculates a deterministic mastery score across lessons, exercises, quizzes, and projects.
 * Formula & Weights:
 * - Lessons completed: 35%
 * - Exercises solved: 30%
 * - Quizzes passed: 15%
 * - Projects completed: 20%
 * Total: 100%
 */
export function calculateMastery(
  path: Path,
  lessonProgressList: LessonProgress[] | Record<string, LessonProgress>,
  projectProgressList: ProjectProgress[] | Record<string, ProjectProgress>
): MasteryBreakdown {
  const lessonMap: Record<string, LessonProgress> = Array.isArray(lessonProgressList)
    ? lessonProgressList.reduce((acc, item) => {
        acc[item.lesson_slug] = item;
        return acc;
      }, {} as Record<string, LessonProgress>)
    : lessonProgressList;

  const projectMap: Record<string, ProjectProgress> = Array.isArray(projectProgressList)
    ? projectProgressList.reduce((acc, item) => {
        acc[item.project_slug] = item;
        return acc;
      }, {} as Record<string, ProjectProgress>)
    : projectProgressList;

  const allLessons: Lesson[] = path.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const totalExercises = allLessons.filter((l) => !!l.exercise).length;
  const totalQuizzes = allLessons.filter((l) => !!(l.quiz && l.quiz.length > 0)).length;
  const totalProjects = path.projects ? path.projects.length : 0;

  let lessonsCompleted = 0;
  let exercisesSolved = 0;
  let quizzesPassed = 0;

  allLessons.forEach((l) => {
    const rec = lessonMap[l.slug];
    if (rec?.status === 'completed') {
      lessonsCompleted++;
    }
    if (rec?.exercise_completed) {
      exercisesSolved++;
    }
    if (rec?.quiz_completed) {
      quizzesPassed++;
    }
  });

  let projectsCompleted = 0;
  if (path.projects) {
    path.projects.forEach((p) => {
      const rec = projectMap[p.slug];
      if (rec?.status === 'completed') {
        projectsCompleted++;
      }
    });
  }

  // Weight calculations
  const lessonWeight = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 35 : 0;
  const exerciseWeight = totalExercises > 0 ? (exercisesSolved / totalExercises) * 30 : 0;
  const quizWeight = totalQuizzes > 0 ? (quizzesPassed / totalQuizzes) * 15 : 0;
  const projectWeight = totalProjects > 0 ? (projectsCompleted / totalProjects) * 20 : 0;

  const overallPercentage = Math.round(lessonWeight + exerciseWeight + quizWeight + projectWeight);

  return {
    overallPercentage: Math.min(100, Math.max(0, overallPercentage)),
    lessonsCompleted,
    totalLessons,
    exercisesSolved,
    totalExercises,
    quizzesPassed,
    totalQuizzes,
    projectsCompleted,
    totalProjects,
  };
}
