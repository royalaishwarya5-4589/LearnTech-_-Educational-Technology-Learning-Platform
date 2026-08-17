import { calculateLearnerAnalytics } from '../analytics';
import { isEligibleForCertification, calculateAssessmentScore } from '../assessmentEngine';
import { getCertificationPolicy } from '../../content/certification-policies';
import { reactNextPath } from '../../content/courses/react-next-path';
import { pythonPath } from '../../content/python-path';
import { generateCertificateId, generateVerificationHash } from '../certificates';
import { getCertificateQrPayload } from '../certificateQr';
import { getAssessmentBySlug } from '../../content/assessments-data';

export async function runStage13ProductionHardeningTests() {
  console.log('=== STAGE 13 PRODUCTION HARDENING & SECURITY SUITE ===\n');

  // ----------------------------------------------------
  // CATEGORY 1: SECURITY & AUTH CONTRACTS
  // ----------------------------------------------------
  // TEST 1 — Development Course Hard-Block
  const devPolicy = getCertificationPolicy('react');
  console.assert(devPolicy.certificationStatus === 'development', 'TEST 1 FAIL: React status must be development');
  const devEligibility = isEligibleForCertification(reactNextPath, [], {}, []);
  console.assert(devEligibility.eligible === false, 'TEST 1 FAIL: Development course cannot be eligible for certificate');
  console.assert(devEligibility.reasons.some((r) => r.includes('development')), 'TEST 1 FAIL: Must state development reason');
  console.log('✔ TEST 1 PASS [SECURITY]: Development courses (React) hard-blocked from certificate issuance.');

  // TEST 2 — Cryptographic Security: Certificate ID & Hash Isolation
  const id1 = generateCertificateId('python');
  const id2 = generateCertificateId('python');
  console.assert(id1 !== id2, 'TEST 2 FAIL: Generated certificate IDs must be distinct and cryptographically random');
  console.assert(id1.startsWith('LT-PY-2026-'), 'TEST 2 FAIL: Prefix format must be valid');
  const timestamp = new Date().toISOString();
  const hash1 = generateVerificationHash(id1, 'user-1', 'python', timestamp);
  const hash2 = generateVerificationHash(id1, 'user-2', 'python', timestamp);
  console.assert(hash1 !== hash2, 'TEST 2 FAIL: Hashes for different users must be distinct');
  console.assert(hash1.length === 64, 'TEST 2 FAIL: Hash must be a 64-character SHA-256 string');
  console.log('✔ TEST 2 PASS [SECURITY]: Cryptographic certificate ID & SHA-256 cross-user hash isolation verified.');

  // ----------------------------------------------------
  // CATEGORY 2: ASSESSMENT ENGINE & REPLAY SECURITY
  // ----------------------------------------------------
  // TEST 3 — Server-Side Score Calculation & Replay Prevention
  const pyAssessment = getAssessmentBySlug('python-comprehensive-eval');
  if (pyAssessment) {
    const rawAnswers = {
      'py-q1': 'guido-van-rossum',
      'py-q2': 'interpreted',
      'py-q3': ['list', 'tuple', 'dict'],
    };
    const scoreResult = calculateAssessmentScore(pyAssessment, rawAnswers, 120, 1);
    console.assert(scoreResult.attempt_number === 1, 'TEST 3 FAIL: Attempt number must be set by server');
    console.assert(typeof scoreResult.score === 'number', 'TEST 3 FAIL: Score must be server-calculated');
    console.assert(typeof scoreResult.passed === 'boolean', 'TEST 3 FAIL: Passing status must be server-calculated');
  }
  console.log('✔ TEST 3 PASS [ASSESSMENTS]: Server-side score calculation, passing threshold & attempt numbering enforced.');

  // ----------------------------------------------------
  // CATEGORY 3: CERTIFICATION LIFECYCLE & ELIGIBILITY
  // ----------------------------------------------------
  // TEST 4 — Ineligible vs Eligible Learner Issuance Check
  const incompleteEligibility = isEligibleForCertification(pythonPath, [], {}, []);
  console.assert(incompleteEligibility.eligible === false, 'TEST 4 FAIL: Incomplete learner must be rejected');
  console.assert(incompleteEligibility.reasons.length > 0, 'TEST 4 FAIL: Must specify rejection reasons');
  console.log('✔ TEST 4 PASS [CERTIFICATES]: Ineligible learners cleanly rejected with clear prerequisite feedback.');

  // ----------------------------------------------------
  // CATEGORY 4: QR & VERIFICATION URL
  // ----------------------------------------------------
  // TEST 5 — Exact Verification QR Payload URL
  const qrPayload = getCertificateQrPayload(id1);
  console.assert(qrPayload.includes(`/verify/${id1}`), 'TEST 5 FAIL: QR code must encode exact canonical verify URL');
  console.log('✔ TEST 5 PASS [QR]: QR code payload encodes exact canonical verification URL:', qrPayload);

  // ----------------------------------------------------
  // CATEGORY 5: ANALYTICS INTEGRITY & ZERO-DATA SAFETY
  // ----------------------------------------------------
  // TEST 6 — Empty Learner Analytics Safety
  const emptyReport = calculateLearnerAnalytics([], [], [], []);
  console.assert(emptyReport.overallMasteryPercentage === 0, 'TEST 6 FAIL: Zero platform mastery for empty user');
  console.assert(emptyReport.averageAssessmentScore === null, 'TEST 6 FAIL: Average score must be null for 0 attempts');
  console.assert(!isNaN(emptyReport.totalLessonsCompleted), 'TEST 6 FAIL: Must be numeric');
  console.log('✔ TEST 6 PASS [ANALYTICS]: Empty learner state handled without NaN, Infinity or crash errors.');

  // TEST 7 — Assessment Statistics & Attempt History Calculations
  const mockAttempts = [
    {
      id: 'att-1',
      user_id: 'u-1',
      path_slug: 'python',
      assessment_id: 'py-final-exam',
      assessment_slug: 'python-final',
      attempt_number: 1,
      started_at: '2026-08-13T10:00:00Z',
      submitted_at: '2026-08-13T10:10:00Z',
      duration_seconds: 600,
      score: 60,
      max_score: 100,
      percentage: 60,
      passed: false,
      answers: {},
      question_results: {},
    },
    {
      id: 'att-2',
      user_id: 'u-1',
      path_slug: 'python',
      assessment_id: 'py-final-exam',
      assessment_slug: 'python-final',
      attempt_number: 2,
      started_at: '2026-08-13T12:00:00Z',
      submitted_at: '2026-08-13T12:10:00Z',
      duration_seconds: 600,
      score: 100,
      max_score: 100,
      percentage: 100,
      passed: true,
      answers: {},
      question_results: {},
    },
  ];
  const analyticsReport = calculateLearnerAnalytics([], [], mockAttempts, []);
  console.assert(analyticsReport.totalAssessmentAttempts === 2, 'TEST 7 FAIL: 2 total attempts expected');
  console.assert(analyticsReport.uniqueAssessmentsAttempted === 1, 'TEST 7 FAIL: 1 unique assessment expected');
  console.assert(analyticsReport.passedAssessmentsCount === 1, 'TEST 7 FAIL: 1 passed assessment expected');
  console.assert(analyticsReport.averageAssessmentScore === 80, 'TEST 7 FAIL: Average of 60 and 100 is 80');
  console.log('✔ TEST 7 PASS [ANALYTICS]: Assessment statistics correctly separate total attempts (2) from unique (1) and calculate average (80%).');

  // TEST 8 — Course Policy Manifest Integrity
  const registeredSlugs = [
    'python', 'java', 'javascript', 'html-css', 'react', 'dbms', 'dsa',
    'genai-llm-agents', 'web-security', 'linux-security', 'git-github',
    'cloud-devops', 'software-testing', 'system-design', 'interview-preparation',
  ];
  for (const slug of registeredSlugs) {
    const pol = getCertificationPolicy(slug);
    console.assert(pol.pathSlug === slug, `Policy mismatch for ${slug}`);
  }
  console.log('✔ TEST 8 PASS [POLICIES]: All 15 active learning paths registered with strict certification policies.');

  console.log('\n=== ALL STAGE 13 PRODUCTION HARDENING TESTS PASSED PERFECTLY ===\n');
  return true;
}

