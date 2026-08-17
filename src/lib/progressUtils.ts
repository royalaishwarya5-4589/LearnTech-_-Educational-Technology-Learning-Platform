import { Path, Lesson, Module } from '@/types/content';
import { LessonProgress } from '@/types/user';
import { getPathBySlug as getContentPathBySlug } from '@/content';

// Helper to get path by slug dynamically across all courses
export function getPathBySlug(pathSlug: string): Path | null {
  const p = getContentPathBySlug(pathSlug);
  if (p && 'modules' in p) {
    return p as Path;
  }
  return null;
}

export interface NextLessonResult {
  lessonSlug: string;
  lessonTitle: string;
  moduleSlug: string;
  moduleTitle: string;
  pathSlug: string;
  isPathCompleted: boolean;
}

/**
 * Calculates the next recommended lesson for a path based on progress records.
 */
export function getNextLesson(
  pathSlug: string,
  progressRecords: LessonProgress[] | Record<string, LessonProgress>
): NextLessonResult | null {
  const path = getPathBySlug(pathSlug);
  if (!path) return null;

  // Convert array to map if needed
  const progressMap: Record<string, LessonProgress> = Array.isArray(progressRecords)
    ? progressRecords.reduce((acc, item) => {
        acc[item.lesson_slug] = item;
        return acc;
      }, {} as Record<string, LessonProgress>)
    : progressRecords;

  for (const moduleItem of path.modules) {
    for (const lessonItem of moduleItem.lessons) {
      const record = progressMap[lessonItem.slug];
      const isCompleted = record?.status === 'completed';
      if (!isCompleted) {
        return {
          lessonSlug: lessonItem.slug,
          lessonTitle: lessonItem.title,
          moduleSlug: moduleItem.slug,
          moduleTitle: moduleItem.title,
          pathSlug,
          isPathCompleted: false,
        };
      }
    }
  }

  // All lessons completed
  const firstModule = path.modules[0];
  const firstLesson = firstModule?.lessons[0];
  return {
    lessonSlug: firstLesson?.slug || '',
    lessonTitle: firstLesson?.title || '',
    moduleSlug: firstModule?.slug || '',
    moduleTitle: firstModule?.title || '',
    pathSlug,
    isPathCompleted: true,
  };
}

/**
 * Evaluates whether a lesson satisfies completion criteria.
 */
export function isLessonFullyCompleted(
  lesson: Lesson,
  progress: Partial<LessonProgress>
): boolean {
  const criteria = lesson.completionCriteria;

  if (criteria?.requiresConceptsRead && !progress.concepts_completed) {
    return false;
  }

  if (criteria?.requiresQuizPassed && lesson.quiz && lesson.quiz.length > 0) {
    if (!progress.quiz_completed) return false;
  }

  if (criteria?.requiresExercisePassed && lesson.exercise) {
    if (!progress.exercise_completed) return false;
  }

  // If no specific criteria fail, and at least exercise is passed or concepts completed
  if (lesson.exercise) {
    return !!progress.exercise_completed;
  }

  return !!progress.concepts_completed;
}

export interface ModuleProgressStats {
  moduleSlug: string;
  moduleTitle: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

export interface PathProgressStats {
  pathSlug: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  remainingLessons: number;
  percentage: number;
  moduleStats: ModuleProgressStats[];
  nextLesson: NextLessonResult | null;
}

/**
 * Computes full path and module progress breakdown from actual content data.
 */
export function calculatePathProgress(
  path: Path,
  progressRecords: LessonProgress[] | Record<string, LessonProgress>
): PathProgressStats {
  const progressMap: Record<string, LessonProgress> = Array.isArray(progressRecords)
    ? progressRecords.reduce((acc, item) => {
        acc[item.lesson_slug] = item;
        return acc;
      }, {} as Record<string, LessonProgress>)
    : progressRecords;

  let totalPathLessons = 0;
  let completedPathLessons = 0;

  const moduleStats: ModuleProgressStats[] = path.modules.map((mod: Module) => {
    const total = mod.lessons.length;
    const completed = mod.lessons.filter((les: Lesson) => {
      const rec = progressMap[les.slug];
      return rec?.status === 'completed';
    }).length;

    totalPathLessons += total;
    completedPathLessons += completed;

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      moduleSlug: mod.slug,
      moduleTitle: mod.title,
      level: mod.level,
      totalLessons: total,
      completedLessons: completed,
      percentage,
    };
  });

  const percentage = totalPathLessons > 0 ? Math.round((completedPathLessons / totalPathLessons) * 100) : 0;
  const nextLesson = getNextLesson(path.slug, progressMap);

  return {
    pathSlug: path.slug,
    title: path.title,
    totalLessons: totalPathLessons,
    completedLessons: completedPathLessons,
    remainingLessons: totalPathLessons - completedPathLessons,
    percentage,
    moduleStats,
    nextLesson,
  };
}

import { NextActivityItem, ProjectProgress } from '@/types/user';

/**
 * Intelligently resolves the next recommended learning activity across lessons and projects.
 */
export function getNextActivity(
  pathSlug: string,
  lessonProgressList: LessonProgress[] | Record<string, LessonProgress>,
  projectProgressList: ProjectProgress[] | Record<string, ProjectProgress> = {}
): NextActivityItem | null {
  const path = getPathBySlug(pathSlug);
  if (!path) return null;

  // 1. Check for uncompleted lesson
  const nextLessonRes = getNextLesson(pathSlug, lessonProgressList);
  if (nextLessonRes && !nextLessonRes.isPathCompleted) {
    return {
      type: 'lesson',
      title: nextLessonRes.lessonTitle,
      subtitle: `Module: ${nextLessonRes.moduleTitle}`,
      pathSlug,
      itemSlug: nextLessonRes.lessonSlug,
      url: `/paths/${pathSlug}/lessons/${nextLessonRes.lessonSlug}`,
    };
  }

  // 2. Check for uncompleted project
  if (path.projects && path.projects.length > 0) {
    const projectMap: Record<string, ProjectProgress> = Array.isArray(projectProgressList)
      ? projectProgressList.reduce((acc, item) => {
          acc[item.project_slug] = item;
          return acc;
        }, {} as Record<string, ProjectProgress>)
      : projectProgressList;

    for (const proj of path.projects) {
      const rec = projectMap[proj.slug];
      if (rec?.status !== 'completed') {
        return {
          type: 'project',
          title: proj.title,
          subtitle: `Portfolio Project (${proj.difficulty})`,
          pathSlug,
          itemSlug: proj.slug,
          url: `/paths/${pathSlug}/projects/${proj.slug}`,
        };
      }
    }
  }

  // 3. Fallback: Path is fully complete
  const firstLesson = path.modules[0]?.lessons[0];
  if (firstLesson) {
    return {
      type: 'lesson',
      title: 'Review Python Path',
      subtitle: 'All core lessons and projects completed!',
      pathSlug,
      itemSlug: firstLesson.slug,
      url: `/paths/${pathSlug}/lessons/${firstLesson.slug}`,
    };
  }

  return null;
}

/**
 * Relative time formatter for activity logs.
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 60) return 'Just now';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
  if (diffSeconds < 172800) return 'Yesterday';
  return `${Math.floor(diffSeconds / 86400)} days ago`;
}


