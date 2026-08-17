const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Helper to load and evaluate a TS file in CommonJS mode
function loadTsFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      inlineSourceMap: true,
    },
  });

  const customModule = { exports: {} };
  const customRequire = (importPath) => {
    if (importPath.startsWith('.') || importPath.startsWith('@/')) {
      let resolved;
      if (importPath.startsWith('@/')) {
        resolved = path.join(__dirname, '../src', importPath.slice(2));
      } else {
        resolved = path.resolve(path.dirname(filePath), importPath);
      }
      
      if (fs.existsSync(resolved + '.ts')) resolved += '.ts';
      else if (fs.existsSync(resolved + '/index.ts')) resolved += '/index.ts';
      else if (fs.existsSync(resolved + '.js')) resolved += '.js';

      if (fs.existsSync(resolved)) {
        return loadTsFile(resolved);
      }
    }
    // Dummy fallback for type imports
    return {};
  };

  const wrapper = Function('exports', 'require', 'module', '__filename', '__dirname', result.outputText);
  wrapper(customModule.exports, customRequire, customModule, filePath, path.dirname(filePath));
  return customModule.exports;
}

// Load all course paths
const pythonPathModule = loadTsFile(path.join(__dirname, '../src/content/python-path.ts'));
const courseFiles = fs.readdirSync(path.join(__dirname, '../src/content/courses')).filter(f => f.endsWith('.ts'));

const courses = [
  pythonPathModule.pythonPath || pythonPathModule.default,
];

for (const file of courseFiles) {
  const mod = loadTsFile(path.join(__dirname, '../src/content/courses', file));
  const exportedCourse = Object.values(mod).find(val => val && typeof val === 'object' && val.slug && val.modules);
  if (exportedCourse) {
    courses.push(exportedCourse);
  }
}

console.log('=== AUDIT STARTED ===');
console.log(`COURSES LOADED: ${courses.length}`);

let grandTotalModules = 0;
let grandTotalLessons = 0;
let grandTotalProjects = 0;
let grandTotalAssessments = 0;

const courseAuditResults = [];
const allLessonsList = [];

let aggregateStats = {
  totalLessons: 0,
  withObjectives: 0,
  withPrerequisites: 0,
  withConceptExplanation: 0,
  withSyntaxReference: 0,
  withTwoPlusExamples: 0,
  withLineByLineExplanation: 0,
  withRealWorldApplications: 0,
  withCommonMistakes: 0,
  withBestPractices: 0,
  withKnowledgeChecks: 0,
  withExercise: 0,
  withHints: 0,
  withTestCases: 0,
  withVideoContext: 0,
  shallowLessons: 0, // < 400 words
  mediumLessons: 0,  // 400-800 words
  deepLessons: 0,    // > 800 words
};

function auditLesson(lesson) {
  const conceptText = (lesson.concepts || []).map(c => `${c.title} ${c.contentMarkdown}`).join(' ');
  const exampleText = (lesson.examples || []).map(e => `${e.title} ${e.description || ''} ${e.code} ${e.explanation}`).join(' ');
  const quizText = (lesson.quiz || []).map(q => `${q.question} ${q.options.join(' ')} ${q.explanation}`).join(' ');
  const exerciseText = lesson.exercise
    ? `${lesson.exercise.instructions} ${lesson.exercise.initialCode} ${lesson.exercise.solutionCode} ${(lesson.exercise.hints || []).join(' ')}`
    : '';

  const fullText = `${lesson.title} ${lesson.description} ${conceptText} ${exampleText} ${quizText} ${exerciseText}`;
  const words = fullText.trim().split(/\s+/).filter(Boolean).length;

  const conceptLower = conceptText.toLowerCase();

  const hasObjectives = Boolean(lesson.learningObjectives && lesson.learningObjectives.length > 0) || conceptLower.includes('objective') || conceptLower.includes('goal') || conceptLower.includes('learn how');
  const hasPrerequisites = (lesson.prerequisites && lesson.prerequisites.length > 0) || Boolean(lesson.prerequisitesText);
  const hasConceptExplanation = Boolean(lesson.concepts && lesson.concepts.length > 0);
  const hasSyntaxReference = conceptLower.includes('syntax') || conceptLower.includes('api') || conceptLower.includes('signature') || conceptLower.includes('method') || conceptLower.includes('function') || conceptLower.includes('class');
  const exampleCount = lesson.examples ? lesson.examples.length : 0;
  const hasLineByLineExplanation = conceptLower.includes('line') || exampleText.toLowerCase().includes('line') || conceptLower.includes('step') || exampleText.toLowerCase().includes('walkthrough');
  const hasRealWorldApplications = conceptLower.includes('real-world') || conceptLower.includes('production') || conceptLower.includes('industry') || conceptLower.includes('use case') || conceptLower.includes('enterprise') || conceptLower.includes('application');
  const hasCommonMistakes = conceptLower.includes('mistake') || conceptLower.includes('pitfall') || conceptLower.includes('trap') || conceptLower.includes('error') || conceptLower.includes('avoid') || conceptLower.includes('common error');
  const hasBestPractices = conceptLower.includes('best practice') || conceptLower.includes('clean code') || conceptLower.includes('convention') || conceptLower.includes('tip') || conceptLower.includes('recommendation');
  const knowledgeCheckCount = lesson.quiz ? lesson.quiz.length : 0;
  const hasExercise = Boolean(lesson.exercise);
  const hasHints = Boolean(lesson.exercise && lesson.exercise.hints && lesson.exercise.hints.length > 0);
  const testCaseCount = lesson.exercise && lesson.exercise.testCases ? lesson.exercise.testCases.length : 0;
  const hasVideoContext = Boolean(lesson.videoContext);

  return {
    words,
    hasObjectives,
    hasPrerequisites,
    hasConceptExplanation,
    hasSyntaxReference,
    exampleCount,
    hasLineByLineExplanation,
    hasRealWorldApplications,
    hasCommonMistakes,
    hasBestPractices,
    knowledgeCheckCount,
    hasExercise,
    hasHints,
    testCaseCount,
    hasVideoContext,
  };
}

for (const course of courses) {
  const modules = course.modules || [];
  const projects = course.projects || [];
  const assessments = course.assessments || [];

  let courseLessons = 0;
  let courseWordsTotal = 0;

  for (const mod of modules) {
    for (const les of mod.lessons || []) {
      courseLessons++;
      const stats = auditLesson(les);
      courseWordsTotal += stats.words;

      allLessonsList.push({
        courseSlug: course.slug,
        courseTitle: course.title,
        lessonId: les.id,
        lessonTitle: les.title,
        words: stats.words,
        stats,
      });

      aggregateStats.totalLessons++;
      if (stats.hasObjectives) aggregateStats.withObjectives++;
      if (stats.hasPrerequisites) aggregateStats.withPrerequisites++;
      if (stats.hasConceptExplanation) aggregateStats.withConceptExplanation++;
      if (stats.hasSyntaxReference) aggregateStats.withSyntaxReference++;
      if (stats.exampleCount >= 2) aggregateStats.withTwoPlusExamples++;
      if (stats.hasLineByLineExplanation) aggregateStats.withLineByLineExplanation++;
      if (stats.hasRealWorldApplications) aggregateStats.withRealWorldApplications++;
      if (stats.hasCommonMistakes) aggregateStats.withCommonMistakes++;
      if (stats.hasBestPractices) aggregateStats.withBestPractices++;
      if (stats.knowledgeCheckCount > 0) aggregateStats.withKnowledgeChecks++;
      if (stats.hasExercise) aggregateStats.withExercise++;
      if (stats.hasHints) aggregateStats.withHints++;
      if (stats.testCaseCount > 0) aggregateStats.withTestCases++;
      if (stats.hasVideoContext) aggregateStats.withVideoContext++;

      if (stats.words < 400) aggregateStats.shallowLessons++;
      else if (stats.words <= 800) aggregateStats.mediumLessons++;
      else aggregateStats.deepLessons++;
    }
  }

  grandTotalModules += modules.length;
  grandTotalLessons += courseLessons;
  grandTotalProjects += projects.length;
  grandTotalAssessments += assessments.length;

  courseAuditResults.push({
    slug: course.slug,
    title: course.title,
    modules: modules.length,
    lessons: courseLessons,
    projects: projects.length,
    assessments: assessments.length,
    avgWordsPerLesson: courseLessons > 0 ? Math.round(courseWordsTotal / courseLessons) : 0,
  });
}

console.log('\n========================================');
console.log('LEARNTECH CONTENT AUDIT RESULTS');
console.log('========================================\n');

console.log(`COURSES FOUND: ${courses.length}`);
console.log(`MODULES FOUND: ${grandTotalModules}`);
console.log(`LESSONS FOUND: ${grandTotalLessons}`);
console.log(`PROJECTS FOUND: ${grandTotalProjects}`);
console.log(`ASSESSMENTS FOUND: ${grandTotalAssessments}`);

console.log('\n--- COURSE BREAKDOWN ---');
console.table(courseAuditResults);

console.log('\n--- LESSON CONTENT FEATURE COVERAGE ---');
console.log(`Total Lessons: ${aggregateStats.totalLessons}`);
console.log(`- Lessons with Objectives: ${aggregateStats.withObjectives} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withObjectives/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Prerequisites: ${aggregateStats.withPrerequisites} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withPrerequisites/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Concept Explanation: ${aggregateStats.withConceptExplanation} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withConceptExplanation/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Syntax/API Reference: ${aggregateStats.withSyntaxReference} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withSyntaxReference/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with 2+ Examples: ${aggregateStats.withTwoPlusExamples} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withTwoPlusExamples/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Line-by-Line Explanation: ${aggregateStats.withLineByLineExplanation} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withLineByLineExplanation/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Real-World Applications: ${aggregateStats.withRealWorldApplications} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withRealWorldApplications/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Common Mistakes: ${aggregateStats.withCommonMistakes} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withCommonMistakes/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Best Practices: ${aggregateStats.withBestPractices} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withBestPractices/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Knowledge Checks: ${aggregateStats.withKnowledgeChecks} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withKnowledgeChecks/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Exercises: ${aggregateStats.withExercise} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withExercise/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Hints: ${aggregateStats.withHints} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withHints/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Test Cases: ${aggregateStats.withTestCases} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withTestCases/aggregateStats.totalLessons*100)}%)`);
console.log(`- Lessons with Video Context: ${aggregateStats.withVideoContext} / ${aggregateStats.totalLessons} (${Math.round(aggregateStats.withVideoContext/aggregateStats.totalLessons*100)}%)`);

console.log('\n--- LESSON DEPTH BREAKDOWN ---');
console.log(`- Shallow Lessons (< 400 words): ${aggregateStats.shallowLessons} (${Math.round(aggregateStats.shallowLessons/aggregateStats.totalLessons*100)}%)`);
console.log(`- Medium Lessons (400-800 words): ${aggregateStats.mediumLessons} (${Math.round(aggregateStats.mediumLessons/aggregateStats.totalLessons*100)}%)`);
console.log(`- Deep Lessons (> 800 words): ${aggregateStats.deepLessons} (${Math.round(aggregateStats.deepLessons/aggregateStats.totalLessons*100)}%)`);

console.log('\n--- TOP 10 SHALLEST LESSONS ---');
const sortedByWords = [...allLessonsList].sort((a, b) => a.words - b.words);
sortedByWords.slice(0, 10).forEach((item, i) => {
  console.log(`${i + 1}. [${item.courseSlug}] ${item.lessonTitle} (${item.lessonId}): ${item.words} words`);
});
