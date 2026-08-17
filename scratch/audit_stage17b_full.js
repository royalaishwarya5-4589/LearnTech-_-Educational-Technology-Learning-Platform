const fs = require('fs');
const path = require('path');

// Import all paths directly from src/content
const { getAllPaths, getPathBySlug } = require('../src/content/index.ts');

const SLUGS = [
  'python',
  'java',
  'javascript',
  'react',
  'html-css',
  'dbms',
  'dsa',
  'genai-llm-agents',
  'web-security',
  'linux-security',
  'git-github',
  'cloud-devops',
  'software-testing',
  'system-design',
  'interview-preparation'
];

async function runExhaustiveAudit() {
  console.log('===========================================================');
  console.log('STAGE 17B — EXHAUSTIVE CONTENT & LEARNER EXPERIENCE AUDIT');
  console.log('===========================================================\n');

  const matrix = {};
  let totalLessonsAnalyzed = 0;
  let totalExercisesAnalyzed = 0;
  let totalProjectsAnalyzed = 0;
  let totalAssessmentsAnalyzed = 0;

  for (const slug of SLUGS) {
    const course = getPathBySlug(slug);
    if (!course) {
      console.error(`❌ Course not found for slug: ${slug}`);
      continue;
    }

    const courseRecord = {
      title: course.title,
      difficulty: course.difficulty,
      estimatedHours: course.estimatedHours,
      totalLessons: course.totalLessons,
      totalProjects: course.totalProjects,
      modulesCount: course.modules.length,
      levelsPresent: {
        foundations: false,
        intermediate: false,
        advanced: false
      },
      lessons: [],
      projects: course.projects ? course.projects.length : 0,
      assessment: course.certificationRequirement ? true : false,
      qualityScore: {
        hasObjectives: 0,
        hasConcepts: 0,
        hasExamples: 0,
        hasExplanations: 0,
        hasQuizzes: 0,
        hasExercises: 0,
        hasReferences: 0
      }
    };

    let courseLessonCount = 0;

    for (const mod of course.modules) {
      if (mod.level === 'foundations' || mod.level === 'absolute_beginner') courseRecord.levelsPresent.foundations = true;
      if (mod.level === 'intermediate') courseRecord.levelsPresent.intermediate = true;
      if (mod.level === 'advanced' || mod.level === 'mastery') courseRecord.levelsPresent.advanced = true;

      for (const les of mod.lessons) {
        courseLessonCount++;
        totalLessonsAnalyzed++;

        const conceptWordCount = les.concepts.reduce((acc, c) => acc + c.contentMarkdown.split(/\s+/).length, 0);
        const exampleCount = les.examples ? les.examples.length : 0;
        const quizCount = les.quiz ? les.quiz.length : 0;
        const hasExercise = les.exercise ? true : false;
        if (hasExercise) totalExercisesAnalyzed++;

        const lessonAudit = {
          id: les.id,
          title: les.title,
          moduleLevel: mod.level,
          conceptCount: les.concepts.length,
          conceptWordCount,
          exampleCount,
          quizCount,
          hasExercise,
          exerciseType: les.exercise ? les.exercise.validationType : null,
          referencesCount: les.references ? les.references.length : 0
        };

        if (les.concepts.some(c => c.contentMarkdown.includes('Learning Objectives'))) courseRecord.qualityScore.hasObjectives++;
        if (les.concepts.length > 0) courseRecord.qualityScore.hasConcepts++;
        if (exampleCount > 0) courseRecord.qualityScore.hasExamples++;
        if (les.examples && les.examples.some(e => e.explanation && e.explanation.length > 10)) courseRecord.qualityScore.hasExplanations++;
        if (quizCount > 0) courseRecord.qualityScore.hasQuizzes++;
        if (hasExercise) courseRecord.qualityScore.hasExercises++;
        if (les.references && les.references.length > 0) courseRecord.qualityScore.hasReferences++;

        courseRecord.lessons.push(lessonAudit);
      }
    }

    if (course.projects) totalProjectsAnalyzed += course.projects.length;
    if (course.certificationRequirement) totalAssessmentsAnalyzed++;

    matrix[slug] = courseRecord;
  }

  console.log(`Audited ${SLUGS.length} Courses:`);
  console.log(`- Total Lessons Analyzed: ${totalLessonsAnalyzed}`);
  console.log(`- Total Exercises Analyzed: ${totalExercisesAnalyzed}`);
  console.log(`- Total Projects Analyzed: ${totalProjectsAnalyzed}`);
  console.log(`- Total Assessments Analyzed: ${totalAssessmentsAnalyzed}\n`);

  fs.writeFileSync(path.join(__dirname, 'exhaustive_matrix.json'), JSON.stringify(matrix, null, 2));
  console.log('Matrix exported to scratch/exhaustive_matrix.json');
}

runExhaustiveAudit();
