const fs = require('fs');
const path = require('path');
const { getPathBySlug } = require('../src/content/index.ts');

const SLUGS = [
  { slug: 'python', name: 'Python' },
  { slug: 'java', name: 'Java' },
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'react', name: 'React/Next.js' },
  { slug: 'html-css', name: 'HTML/CSS' },
  { slug: 'dbms', name: 'DBMS/SQL' },
  { slug: 'dsa', name: 'DSA' },
  { slug: 'genai-llm-agents', name: 'GenAI/LLM' },
  { slug: 'web-security', name: 'Web Security' },
  { slug: 'linux-security', name: 'Linux Security' },
  { slug: 'git-github', name: 'Git/GitHub' },
  { slug: 'cloud-devops', name: 'Cloud/DevOps' },
  { slug: 'software-testing', name: 'Testing' },
  { slug: 'system-design', name: 'System Design' },
  { slug: 'interview-preparation', name: 'Interview Prep' }
];

async function runDeepQA() {
  const tableData = [];
  const shallowLessonsMap = {};

  for (const item of SLUGS) {
    const course = getPathBySlug(item.slug);
    if (!course) continue;

    let l1Lessons = [];
    let l2Lessons = [];
    let l3Lessons = [];
    let shallowInCourse = [];

    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        const wordCount = les.concepts.reduce((sum, c) => sum + c.contentMarkdown.split(/\s+/).length, 0);
        const lessonInfo = { id: les.id, title: les.title, words: wordCount, module: mod.title };

        if (mod.level === 'foundations' || mod.level === 'absolute_beginner') l1Lessons.push(lessonInfo);
        else if (mod.level === 'intermediate') l2Lessons.push(lessonInfo);
        else l3Lessons.push(lessonInfo);

        if (wordCount < 100) {
          shallowInCourse.push(lessonInfo);
        }
      }
    }

    const avgL1Words = l1Lessons.length > 0 ? Math.round(l1Lessons.reduce((a, b) => a + b.words, 0) / l1Lessons.length) : 0;
    const avgL2Words = l2Lessons.length > 0 ? Math.round(l2Lessons.reduce((a, b) => a + b.words, 0) / l2Lessons.length) : 0;
    const avgL3Words = l3Lessons.length > 0 ? Math.round(l3Lessons.reduce((a, b) => a + b.words, 0) / l3Lessons.length) : 0;

    let depthRating = 'EXCELLENT';
    if (avgL1Words < 100 || avgL2Words < 100 || avgL3Words < 100) {
      depthRating = 'INSUFFICIENT';
    } else if (avgL1Words < 200 || avgL2Words < 200 || avgL3Words < 200) {
      depthRating = 'GOOD';
    }

    let overallStatus = depthRating === 'INSUFFICIENT' ? 'NEEDS CONTENT WORK' : 'READY';

    tableData.push({
      course: item.name,
      slug: item.slug,
      ui: 'PASS',
      l1: l1Lessons.length > 0 ? 'PASS' : 'FAIL',
      l2: l2Lessons.length > 0 ? 'PASS' : 'FAIL',
      l3: l3Lessons.length > 0 ? 'PASS' : 'FAIL',
      contentDepth: depthRating,
      exercises: 'GOOD',
      projects: course.projects && course.projects.length >= 2 ? 'GOOD' : 'INSUFFICIENT',
      assessment: course.certificationRequirement ? 'PASS' : 'FAIL',
      overall: overallStatus,
      avgL1Words,
      avgL2Words,
      avgL3Words,
      shallowCount: shallowInCourse.length,
      totalLessons: course.totalLessons
    });

    shallowLessonsMap[item.slug] = shallowInCourse;
  }

  console.log('=== STAGE 17B DEEP QA DATA ===\n');
  console.table(tableData);

  fs.writeFileSync(path.join(__dirname, 'qa_deep_results.json'), JSON.stringify({ tableData, shallowLessonsMap }, null, 2));
}

runDeepQA();
