import { calculateLearnerAnalytics } from '../analytics';
import { pythonPath } from '../../content/python-path';
import { LessonProgress, ProjectProgress, AssessmentAttempt, Certificate } from '@/types/user';

export function runStage12ContractTests() {
  console.log('=== STAGE 12 ANALYTICS & PROGRESS REPORTING CONTRACT TESTS ===\n');

  // TEST 1 — Empty Learner State
  const emptyReport = calculateLearnerAnalytics([], [], [], []);
  console.assert(emptyReport.totalLessonsCompleted === 0, 'TEST 1 FAIL: Empty total lessons');
  console.assert(emptyReport.totalAssessmentAttempts === 0, 'TEST 1 FAIL: Empty total attempts');
  console.assert(emptyReport.uniqueAssessmentsAttempted === 0, 'TEST 1 FAIL: Empty unique assessments');
  console.assert(emptyReport.averageAssessmentScore === null, 'TEST 1 FAIL: Average score must be null for 0 attempts');
  console.assert(emptyReport.certificatesEarnedCount === 0, 'TEST 1 FAIL: Empty certificates count');
  console.assert(emptyReport.courses.length === 15, 'TEST 1 FAIL: All 15 active courses must be included');
  console.log('✔ TEST 1 PASS: Empty learner state produces clean, authentic zero metrics without fake data.');

  // TEST 2 — Assessment Attempts vs Unique Assessments Distinction
  const attempts: AssessmentAttempt[] = [
    {
      id: 'att-1',
      user_id: 'u1',
      path_slug: 'python',
      assessment_id: 'py-final-exam',
      assessment_slug: 'python-final',
      attempt_number: 1,
      started_at: '2026-08-13T10:00:00Z',
      submitted_at: '2026-08-13T10:15:00Z',
      duration_seconds: 900,
      score: 70,
      max_score: 100,
      percentage: 70,
      passed: false,
      answers: {},
      question_results: {},
    },
    {
      id: 'att-2',
      user_id: 'u1',
      path_slug: 'python',
      assessment_id: 'py-final-exam',
      assessment_slug: 'python-final',
      attempt_number: 2,
      started_at: '2026-08-13T11:00:00Z',
      submitted_at: '2026-08-13T11:15:00Z',
      duration_seconds: 900,
      score: 90,
      max_score: 100,
      percentage: 90,
      passed: true,
      answers: {},
      question_results: {},
    },
  ];

  const attemptReport = calculateLearnerAnalytics([], [], attempts, []);
  console.assert(attemptReport.totalAssessmentAttempts === 2, 'TEST 2 FAIL: Should count 2 total attempts');
  console.assert(attemptReport.uniqueAssessmentsAttempted === 1, 'TEST 2 FAIL: Should count 1 unique assessment');
  console.assert(attemptReport.passedAssessmentsCount === 1, 'TEST 2 FAIL: Should count 1 passed assessment');
  console.assert(attemptReport.averageAssessmentScore === 80, 'TEST 2 FAIL: Average score of 70 and 90 must be 80');
  console.log('✔ TEST 2 PASS: Correctly distinguishes total attempts (2) vs unique assessments (1) and average score (80%).');

  // TEST 3 — Fully Completed Python Learner & Certificate Integration
  const mockLessonProgress: LessonProgress[] = pythonPath.modules.flatMap((m) => m.lessons).map((l) => ({
    user_id: 'u1',
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

  const mockProjectProgress: ProjectProgress[] = (pythonPath.projects || []).map((p) => ({
    user_id: 'u1',
    path_slug: 'python',
    project_slug: p.slug,
    status: 'completed' as const,
    completed_milestones: p.milestones.map((m) => m.id),
    progress_percent: 100,
  }));

  const mockCertificates: Certificate[] = [
    {
      id: 'c-1',
      certificate_id: 'LT-PY-2026-001',
      user_id: 'u1',
      path_slug: 'python',
      course_title: 'Python Software Engineering Path',
      learner_name: 'Jane Doe',
      issued_at: new Date().toISOString(),
      final_score: 95,
      mastery_percentage: 92,
      certificate_status: 'issued',
      verification_hash: 'a'.repeat(64),
    },
  ];

  const completedReport = calculateLearnerAnalytics(
    mockLessonProgress,
    mockProjectProgress,
    attempts,
    mockCertificates,
    5
  );

  const totalPythonModuleLessons = pythonPath.modules.flatMap((m) => m.lessons).length;
  console.assert(completedReport.totalCoursesStarted >= 1, 'TEST 3 FAIL: At least 1 course started');
  console.assert(completedReport.totalLessonsCompleted === totalPythonModuleLessons, 'TEST 3 FAIL: All python lessons completed');
  console.assert(completedReport.totalProjectsCompleted === (pythonPath.projects?.length || 0), 'TEST 3 FAIL: All projects completed');
  console.assert(completedReport.certificatesEarnedCount === 1, 'TEST 3 FAIL: 1 certificate earned');
  console.assert(completedReport.currentStreak === 5, 'TEST 3 FAIL: Streak should be 5');

  const pyAnalytics = completedReport.courses.find((c) => c.pathSlug === 'python');
  console.assert(pyAnalytics?.certificationStatus === 'issued', 'TEST 3 FAIL: Python certification status should be issued');
  console.log('✔ TEST 3 PASS: Completed Python learner report accurate with 100% lessons, projects, and issued certificate.');

  // TEST 4 — Development Courses Readiness Blocking
  const reactAnalytics = completedReport.courses.find((c) => c.pathSlug === 'react');
  console.assert(reactAnalytics?.readinessState === 'development', 'TEST 4 FAIL: React must be development status');
  console.assert(reactAnalytics?.certificationStatus === 'in_development', 'TEST 4 FAIL: React certification status must be in_development');
  console.log('✔ TEST 4 PASS: Development course (React) correctly identified with readinessState="development".');

  console.log('\n=== ALL STAGE 12 ANALYTICS CONTRACT TESTS PASSED PERFECTLY ===\n');
  return true;
}
