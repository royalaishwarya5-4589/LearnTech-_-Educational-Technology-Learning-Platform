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

async function runTests() {
  console.log('=== STARTING AI TUTOR API REAL-WORLD QA TESTS ===\n');

  // Test 1: General question
  console.log('Test 1: General question request...');
  const t1 = await makeRequest({ message: 'What is Python?' });
  console.log('Status:', t1.status);
  console.log('Response:', t1.body);
  console.log('--------------------------------------------------\n');

  // Test 2: Lesson Context (Python -> Variables)
  console.log('Test 2: Lesson Context (Python -> Variables)...');
  const t2 = await makeRequest({
    message: 'Explain this lesson',
    mode: 'EXPLANATION',
    pathSlug: 'python',
    lessonSlug: 'variables-data-types-io',
  });
  console.log('Status:', t2.status);
  console.log('Response:', t2.body);
  console.log('--------------------------------------------------\n');

  // Test 3: Debug Code & Console Output Context
  console.log('Test 3: Debug Code & Console Output Context...');
  const t3 = await makeRequest({
    message: 'Why is my code failing?',
    mode: 'DEBUG',
    pathSlug: 'python',
    lessonSlug: 'variables-data-types-io',
    code: 'x = 10\nprint(y)',
    consoleOutput: '[STDERR] NameError: name "y" is not defined on line 2',
  });
  console.log('Status:', t3.status);
  console.log('Response:', t3.body);
  console.log('--------------------------------------------------\n');

  // Test 4: Hint Mode
  console.log('Test 4: Hint Mode...');
  const t4 = await makeRequest({
    message: 'Give me a hint',
    mode: 'HINT',
    pathSlug: 'python',
    lessonSlug: 'variables-data-types-io',
  });
  console.log('Status:', t4.status);
  console.log('Response:', t4.body);
  console.log('--------------------------------------------------\n');

  // Test 5: Quiz Mode
  console.log('Test 5: Quiz Mode...');
  const t5 = await makeRequest({
    message: 'Quiz me on this lesson',
    mode: 'QUIZ',
    pathSlug: 'python',
    lessonSlug: 'variables-data-types-io',
  });
  console.log('Status:', t5.status);
  console.log('Response:', t5.body);
  console.log('--------------------------------------------------\n');

  console.log('=== ALL API TESTS COMPLETED ===');
}

runTests().catch(console.error);
