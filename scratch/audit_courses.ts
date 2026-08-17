import { getPathBySlug, pathCategories } from './src/content/index';

const allCourseSlugs = [
  'python',
  'java',
  'javascript',
  'html-css',
  'react',
  'dbms',
  'dsa',
  'genai-llm-agents',
  'web-security',
  'linux-security',
  'git-github',
  'cloud-devops',
  'software-testing',
  'system-design',
  'interview-preparation',
];

console.log('--- LEARNTECH CURRICULUM AUDIT REPORT ---');
let grandTotalLessons = 0;
let grandTotalModules = 0;
let grandTotalProjects = 0;

allCourseSlugs.forEach((slug, idx) => {
  const course = getPathBySlug(slug);
  if (!course || !('modules' in course)) {
    console.log(`${idx + 1}. [${slug}] NOT FOUND OR INCOMPLETE`);
    return;
  }

  const moduleCount = course.modules.length;
  const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const projectCount = course.projects ? course.projects.length : 0;
  const assessmentCount = course.assessments ? course.assessments.length : 0;
  const exerciseCount = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => Boolean(l.exercise)).length,
    0
  );
  const quizCount = course.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => Boolean(l.quiz)).length,
    0
  );

  grandTotalLessons += lessonCount;
  grandTotalModules += moduleCount;
  grandTotalProjects += projectCount;

  console.log(
    `${idx + 1}. ${course.title} (${slug})\n` +
    `   - Modules: ${moduleCount} | Lessons: ${lessonCount} | Coding Exercises: ${exerciseCount} | Quizzes: ${quizCount} | Projects: ${projectCount} | Assessments: ${assessmentCount}\n` +
    `   - Status: ${course.certificationRequirement?.certificationStatus || 'N/A'}`
  );
});

console.log(`\nGRAND TOTALS: ${grandTotalModules} Modules across 15 Courses | ${grandTotalLessons} Lessons | ${grandTotalProjects} Projects`);
