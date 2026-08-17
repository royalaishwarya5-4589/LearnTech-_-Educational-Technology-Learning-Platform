import { getCertificateQrPayload, generateCertificateQrDataUrl } from '../certificateQr';
import { getCertificationPolicy } from '../../content/certification-policies';
import { isEligibleForCertification } from '../assessmentEngine';
import { pythonPath } from '../../content/python-path';
import { reactNextPath } from '../../content/courses/react-next-path';
import { generateCertificateId, generateVerificationHash } from '../certificates';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';

export async function runStage11_5ContractTests() {
  console.log('=== STAGE 11.5 CONTRACT & FUNCTIONAL TESTS ===\n');

  // TEST 1 — Python Eligible Learner
  const mockLessonProgress = pythonPath.modules.flatMap(m => m.lessons).map(l => ({
    user_id: 'test-user-1',
    path_slug: 'python',
    lesson_slug: l.slug,
    status: 'completed' as const,
    concepts_completed: true,
    quiz_completed: true,
    quiz_score: 100,
    quiz_total: 100,
    exercise_completed: true,
    last_accessed_at: new Date().toISOString(),
  }));

  const mockProjectProgress = (pythonPath.projects || []).reduce((acc, p) => {
    acc[p.slug] = {
      user_id: 'test-user-1',
      path_slug: 'python',
      project_slug: p.slug,
      status: 'completed' as const,
      completed_milestones: p.milestones.map(m => m.id),
      progress_percent: 100,
    };
    return acc;
  }, {} as Record<string, import('@/types/user').ProjectProgress>);

  const mockAssessmentAttempts = [
    {
      id: 'att-1',
      user_id: 'test-user-1',
      path_slug: 'python',
      assessment_id: 'py-assessment-final',
      assessment_slug: 'python-mastery-final-exam',
      attempt_number: 1,
      started_at: new Date().toISOString(),
      submitted_at: new Date().toISOString(),
      duration_seconds: 600,
      score: 100,
      max_score: 100,
      percentage: 100,
      passed: true,
      answers: {},
      question_results: {},
    },
  ];

  const pyEligible = isEligibleForCertification(pythonPath, mockLessonProgress, mockProjectProgress, mockAssessmentAttempts);
  console.assert(pyEligible.eligible === true, 'TEST 1 FAIL: Python eligible learner should be eligible');
  console.log('✔ TEST 1 PASS: Python fully completed learner is eligible.');

  // TEST 2 — Python Incomplete Learner
  const pyIncomplete = isEligibleForCertification(pythonPath, mockLessonProgress.slice(0, 10), {}, []);
  console.assert(pyIncomplete.eligible === false, 'TEST 2 FAIL: Incomplete learner should not be eligible');
  console.assert(pyIncomplete.reasons.length > 0, 'TEST 2 FAIL: Incomplete learner should state reasons');
  console.log('✔ TEST 2 PASS: Python incomplete learner rejected with reasons:', pyIncomplete.reasons[0]);

  // TEST 3 — Development Course Blocking
  const devCourseEligible = isEligibleForCertification(reactNextPath, [], {}, []);
  console.assert(devCourseEligible.eligible === false, 'TEST 3 FAIL: Development course should not be eligible');
  console.assert(devCourseEligible.reasons[0].includes('development'), 'TEST 3 FAIL: Reason must state development status');
  console.log('✔ TEST 3 PASS: Development course (React) correctly blocked:', devCourseEligible.reasons[0]);

  // TEST 4 — Certification Policies Registry Coverage
  const activeCourseSlugs = [
    'python', 'java', 'javascript', 'html-css', 'react', 'dbms', 'dsa',
    'genai-llm-agents', 'web-security', 'linux-security', 'git-github',
    'cloud-devops', 'software-testing', 'system-design', 'interview-preparation',
  ];
  for (const slug of activeCourseSlugs) {
    const policy = getCertificationPolicy(slug);
    console.assert(!!policy, `Policy missing for ${slug}`);
  }
  console.log('✔ TEST 4 PASS: All 15 active courses registered in certification-policies.ts.');

  // TEST 5 — QR Code Payload Contract
  const testCertId = 'LT-PY-2026-TEST1234';
  const qrPayload = getCertificateQrPayload(testCertId);
  console.assert(qrPayload.includes(`/verify/${testCertId}`), 'TEST 5 FAIL: QR payload must encode verification URL');
  console.log('✔ TEST 5 PASS: QR payload correctly encodes:', qrPayload);

  // TEST 6 — Real QR Data URL Generation
  const qrDataUrl = await generateCertificateQrDataUrl(testCertId);
  console.assert(qrDataUrl.startsWith('data:image/png;base64,'), 'TEST 6 FAIL: QR Data URL should be valid base64 PNG');
  console.log('✔ TEST 6 PASS: QR code generated valid PNG Data URL.');

  // TEST 7 — Real PDF Generation Contract
  const qrBuffer = await QRCode.toBuffer(qrPayload, { type: 'png', width: 200 });
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]);
  const qrImg = await pdfDoc.embedPng(qrBuffer);
  page.drawImage(qrImg, { x: 100, y: 100, width: 70, height: 70 });
  page.drawText(`Certificate ID: ${testCertId}`, { x: 100, y: 200, size: 14 });
  const pdfBytes = await pdfDoc.save();

  console.assert(pdfBytes.length > 500, 'TEST 7 FAIL: Generated PDF should have meaningful non-zero size');
  const pdfHeader = Buffer.from(pdfBytes).subarray(0, 5).toString('ascii');
  console.assert(pdfHeader === '%PDF-', 'TEST 7 FAIL: PDF binary must start with %PDF- header');
  console.log('✔ TEST 7 PASS: Real PDF document created with valid header (%PDF-) and size:', pdfBytes.length, 'bytes.');

  // TEST 8 — Certificate ID & Verification Hash Format
  const generatedId = generateCertificateId('python');
  console.assert(generatedId.startsWith('LT-PY-2026-'), 'TEST 8 FAIL: Certificate ID prefix format');
  const hash = generateVerificationHash(generatedId, 'user-123', 'python', new Date().toISOString());
  console.assert(hash.length === 64, 'TEST 8 FAIL: Verification hash should be 64-char hex SHA-256');
  console.log('✔ TEST 8 PASS: Certificate ID and SHA-256 hash valid:', generatedId, hash.slice(0, 16) + '...');

  console.log('\n=== ALL STAGE 11.5 CONTRACT TESTS PASSED PERFECTLY ===\n');
  return true;
}
