const fs = require('fs');
const path = require('path');

const coursesDir = path.join(__dirname, '..', 'src', 'content', 'courses');
const pythonPathFile = path.join(__dirname, '..', 'src', 'content', 'python-path.ts');

const files = fs.readdirSync(coursesDir).map(f => path.join(coursesDir, f));
files.push(pythonPathFile);

console.log('--- CURRICULUM AUDIT ---');

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
  const title = titleMatch ? titleMatch[1] : path.basename(filePath);
  const slug = slugMatch ? slugMatch[1] : 'unknown';

  const moduleMatches = content.match(/level:\s*['"][^'"]+['"]/g) || [];
  const lessonMatches = content.match(/id:\s*['"][^'"]+-les-/g) || content.match(/orderIndex:/g) || [];
  const exerciseMatches = content.match(/exercise:\s*\{/g) || [];
  const quizMatches = content.match(/quiz:\s*\[/g) || [];
  const projectMatches = content.match(/id:\s*['"][^'"]+-proj-/g) || [];

  console.log(`Course: ${title} (${slug})`);
  console.log(`  File: ${path.basename(filePath)}`);
  console.log(`  Modules: ${moduleMatches.length}`);
  console.log(`  Lessons (approx): ${lessonMatches.length}`);
  console.log(`  Exercises: ${exerciseMatches.length}`);
  console.log(`  Quizzes: ${quizMatches.length}`);
  console.log(`  Projects: ${projectMatches.length}`);
  console.log('---');
});
