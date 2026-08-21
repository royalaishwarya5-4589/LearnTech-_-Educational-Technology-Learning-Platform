const http = require('http');

async function makeRequest(payload) {
  const data = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = http.request(
      'http://localhost:3000/api/ai-tutor',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runStage136Tests() {
  console.log('==================================================');
  console.log('STAGE 13.6 — 10 SPECIFIC TEST CASES VERIFICATION');
  console.log('==================================================\n');

  const pathSlug = 'python';
  const lessonSlug = 'variables-data-types-io';
  let history = [];

  const testCases = [
    { id: 1, message: 'Explain this lesson', mode: 'EXPLANATION' },
    { id: 2, message: 'Can you explain this clearly?', mode: 'TUTOR' },
    { id: 3, message: 'What is a variable?', mode: 'TUTOR' },
    { id: 4, message: 'Give me a simple example.', mode: 'TUTOR' },
    { id: 5, message: 'Why does Python allow different types?', mode: 'TUTOR' },
    { id: 6, message: 'Give me a hint.', mode: 'HINT' },
    { id: 7, message: 'Quiz me.', mode: 'QUIZ' },
    { id: 8, message: 'Summarize this lesson.', mode: 'SUMMARY' },
    { id: 9, message: 'Debug my code.', mode: 'DEBUG', code: 'x = 10\nprint(y)', consoleOutput: '[STDERR] NameError: name "y" is not defined on line 2' },
    { id: 10, message: 'Explain this error.', mode: 'EXPLAIN_ERROR', consoleOutput: '[STDERR] NameError: name "y" is not defined on line 2' },
  ];

  const results = [];

  for (const tc of testCases) {
    console.log(`\n--- Test Case ${tc.id}: "${tc.message}" ---`);
    const payload = {
      message: tc.message,
      mode: tc.mode,
      pathSlug,
      lessonSlug,
      code: tc.code,
      consoleOutput: tc.consoleOutput,
      history,
    };

    const res = await makeRequest(payload);
    const text = res.body.message || '';

    console.log('Status:', res.status);
    console.log('Context:', res.body.contextSummary);
    console.log('Response Output:\n' + text.slice(0, 300) + '...');

    results.push({ id: tc.id, question: tc.message, responseSnippet: text.slice(0, 120) });

    // Append to conversation history for multi-turn test
    history.push({ role: 'user', content: tc.message });
    history.push({ role: 'assistant', content: text });
    if (history.length > 6) history = history.slice(-6);

    // Wait 250ms to respect sliding window rate limit
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log('\n==================================================');
  console.log('SUMMARY OF 10 TEST CASES');
  console.log('==================================================');
  results.forEach((r) => {
    console.log(`Test ${r.id} ["${r.question}"]: ${r.responseSnippet.replace(/\n/g, ' ')}...`);
  });

  // Verify all responses are distinct
  const uniqueSnippets = new Set(results.map((r) => r.responseSnippet));
  console.log(`\nUnique response count: ${uniqueSnippets.size} / 10`);
  if (uniqueSnippets.size === 10) {
    console.log('✅ ALL 10 TEST CASES PRODUCED DISTINCT CONTEXTUAL RESPONSES!');
  } else {
    console.log('❌ SOME RESPONSES WERE REPEATED!');
  }
}

runStage136Tests().catch(console.error);
