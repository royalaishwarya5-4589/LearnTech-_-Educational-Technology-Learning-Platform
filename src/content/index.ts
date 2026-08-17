import { Path, Module, Lesson } from '../types/content';
import { pathCategories, CategorySummary, PathSummary } from './paths';
import { pythonPath } from './python-path';
import { javaPath } from './courses/java-path';
import { javascriptPath } from './courses/javascript-path';
import { webDevPath } from './courses/web-dev-path';
import { reactNextPath } from './courses/react-next-path';
import { sqlDbmsPath } from './courses/sql-dbms-path';
import { dsaPath } from './courses/dsa-path';
import { aiMlPath } from './courses/ai-ml-path';
import { cybersecurityPath } from './courses/cybersecurity-path';
import { linuxPath } from './courses/linux-path';
import { gitGithubPath } from './courses/git-github-path';
import { cloudDevopsPath } from './courses/cloud-devops-path';
import { testingPath } from './courses/testing-path';
import { systemDesignPath } from './courses/system-design-path';
import { interviewPrepPath } from './courses/interview-prep-path';

export function getAllCategories(): CategorySummary[] {
  return pathCategories;
}

export function getAllPaths(): PathSummary[] {
  return pathCategories.flatMap((category) => category.paths);
}

export function getActivePaths(): PathSummary[] {
  return getAllPaths().filter((p) => p.isActive);
}

const ACTIVE_COURSES: Record<string, Path> = {
  python: pythonPath,
  java: javaPath,
  javascript: javascriptPath,
  'html-css': webDevPath,
  react: reactNextPath,
  dbms: sqlDbmsPath,
  dsa: dsaPath,
  'genai-llm-agents': aiMlPath,
  'web-security': cybersecurityPath,
  'linux-security': linuxPath,
  'git-github': gitGithubPath,
  'cloud-devops': cloudDevopsPath,
  'software-testing': testingPath,
  'system-design': systemDesignPath,
  'interview-preparation': interviewPrepPath,
};

export function registerActiveCourse(course: Path): void {
  ACTIVE_COURSES[course.slug] = course;
}

export function getPathBySlug(slug: string): Path | PathSummary | undefined {
  if (ACTIVE_COURSES[slug]) {
    return ACTIVE_COURSES[slug];
  }
  return getAllPaths().find((p) => p.slug === slug);
}

export interface LessonDetails {
  path: Path;
  module: Module;
  lesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  lessonIndex: number;
  totalLessons: number;
}

export function getLessonDetails(pathSlug: string, lessonSlug: string): LessonDetails | undefined {
  const pathObj = getPathBySlug(pathSlug);
  if (!pathObj || !('modules' in pathObj)) return undefined;

  const path = pathObj as Path;
  const allLessonsWithModule: { lesson: Lesson; module: Module }[] = [];

  for (const mod of path.modules) {
    for (const les of mod.lessons) {
      allLessonsWithModule.push({ lesson: les, module: mod });
    }
  }

  const foundIndex = allLessonsWithModule.findIndex((item) => item.lesson.slug === lessonSlug);
  if (foundIndex === -1) return undefined;

  const { lesson, module } = allLessonsWithModule[foundIndex];
  const prevLesson = foundIndex > 0 ? allLessonsWithModule[foundIndex - 1].lesson : undefined;
  const nextLesson = foundIndex < allLessonsWithModule.length - 1 ? allLessonsWithModule[foundIndex + 1].lesson : undefined;

  return {
    path,
    module,
    lesson,
    prevLesson,
    nextLesson,
    lessonIndex: foundIndex + 1,
    totalLessons: allLessonsWithModule.length,
  };
}

export interface ProjectDetails {
  path: Path;
  project: import('../types/content').Project;
  projectIndex: number;
  totalProjects: number;
}

export function getProjectDetails(pathSlug: string, projectSlug: string): ProjectDetails | undefined {
  const pathObj = getPathBySlug(pathSlug);
  if (!pathObj || !('modules' in pathObj)) return undefined;

  const path = pathObj as Path;
  const projects = path.projects || [];
  const foundIndex = projects.findIndex((p) => p.slug === projectSlug);
  if (foundIndex === -1) return undefined;

  return {
    path,
    project: projects[foundIndex],
    projectIndex: foundIndex + 1,
    totalProjects: projects.length,
  };
}
