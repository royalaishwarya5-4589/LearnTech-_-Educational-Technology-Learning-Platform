const http = require('http');
const fs = require('fs');
const path = require('path');

// Target server
const BASE_URL = 'http://localhost:3000';

const COURSES = [
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

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', (err) => reject(err));
  });
}

async function runAudit() {
  console.log('=== STARTING STAGE 17B REAL LEARNER EXPERIENCE AUDIT ===\n');

  const report = {
    homepage: {},
    catalog: {},
    courses: {},
    contentDepth: {},
    summary: {}
  };

  // 1. Audit Homepage
  console.log('[1/5] Auditing Homepage (/) ...');
  try {
    const hp = await fetchPage('/');
    report.homepage.status = hp.status;
    report.homepage.hasTitle = hp.body.includes('LearnTech') || hp.body.includes('Master Software Engineering');
    report.homepage.hasCTA = hp.body.includes('Browse') || hp.body.includes('Explore') || hp.body.includes('Start');
    console.log(` -> Homepage HTTP Status: ${hp.status}, Content Length: ${hp.body.length} bytes`);
  } catch (err) {
    console.error(' -> Homepage error:', err.message);
  }

  // 2. Audit Course Catalog (/paths)
  console.log('\n[2/5] Auditing Course Catalog (/paths) ...');
  try {
    const catalog = await fetchPage('/paths');
    report.catalog.status = catalog.status;
    report.catalog.hasSearch = catalog.body.includes('Search') || catalog.body.includes('input');
    report.catalog.hasCategories = catalog.body.includes('Programming') || catalog.body.includes('Computer Science');
    console.log(` -> Catalog HTTP Status: ${catalog.status}, Content Length: ${catalog.body.length} bytes`);
  } catch (err) {
    console.error(' -> Catalog error:', err.message);
  }

  // 3. Audit all 15 Course Landing Pages
  console.log('\n[3/5] Auditing All 15 Course Landing Pages ...');
  for (const slug of COURSES) {
    try {
      const res = await fetchPage(`/paths/${slug}`);
      const body = res.body;

      const hasHero = body.includes('Level 1:') || body.includes('Foundations') || body.includes('Hours');
      const hasL1 = body.includes('Level 1');
      const hasL2 = body.includes('Level 2');
      const hasL3 = body.includes('Level 3');
      const hasOutcomes = body.includes('Outcomes') || body.includes('Skills') || body.includes('Learn');
      const hasCTA = body.includes('Start') || body.includes('Continue') || body.includes('Lesson');

      report.courses[slug] = {
        status: res.statusCode,
        length: body.length,
        hasHero,
        hasL1,
        hasL2,
        hasL3,
        hasOutcomes,
        hasCTA
      };

      console.log(` -> [/paths/${slug}] Status: ${res.statusCode} | Length: ${body.length}B | L1/L2/L3: ${hasL1}/${hasL2}/${hasL3} | CTA: ${hasCTA}`);
    } catch (err) {
      console.error(` -> [/paths/${slug}] ERROR:`, err.message);
    }
  }

  // 4. Save results
  const outputPath = path.join(__dirname, 'audit_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\nAudit results written to ${outputPath}`);
}

runAudit();
