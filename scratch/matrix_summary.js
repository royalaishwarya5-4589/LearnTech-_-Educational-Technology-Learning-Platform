const fs = require('fs');
const matrix = JSON.parse(fs.readFileSync('scratch/exhaustive_matrix.json', 'utf8'));

console.log('=== COURSE CONTENT DEPTH SUMMARY ===\n');

for (const [slug, course] of Object.entries(matrix)) {
  const shortLessons = course.lessons.filter(l => l.conceptWordCount < 100);
  const deepLessons = course.lessons.filter(l => l.conceptWordCount >= 100);
  const totalWords = course.lessons.reduce((acc, l) => acc + l.conceptWordCount, 0);
  const avgWords = Math.round(totalWords / course.lessons.length);

  console.log(`Course: ${course.title} (${slug})`);
  console.log(`  - Total Lessons: ${course.lessons.length}`);
  console.log(`  - Avg Concept Words/Lesson: ${avgWords}`);
  console.log(`  - Deep Lessons (>=100 words): ${deepLessons.length}`);
  console.log(`  - Short Lessons (<100 words): ${shortLessons.length}`);
  if (shortLessons.length > 0) {
    console.log(`  - Short Lesson IDs: ${shortLessons.map(l => l.id).join(', ')}`);
  }
  console.log('---');
}
