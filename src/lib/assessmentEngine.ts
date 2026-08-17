import { Assessment, AssessmentQuestion } from '@/types/content';
import { QuestionResultItem, AssessmentAttempt, CertificationEligibility, LessonProgress, ProjectProgress } from '@/types/user';
import { Path } from '@/types/content';

/**
 * Evaluates a single assessment question securely.
 */
export function evaluateQuestion(
  q: AssessmentQuestion,
  userAnswer: unknown
): QuestionResultItem {
  const maxScore = q.points || 10;
  let passed = false;

  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return {
      passed: false,
      score: 0,
      maxScore,
      explanation: q.explanation,
      userAnswer: null,
      correctAnswer: q.correctAnswer,
    };
  }

  switch (q.type) {
    case 'single_choice':
    case 'true_false':
    case 'scenario': {
      passed = String(userAnswer) === String(q.correctAnswer);
      break;
    }
    case 'multiple_choice': {
      if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
        const sortedUser = [...userAnswer].map(Number).sort((a, b) => a - b);
        const sortedCorrect = [...q.correctAnswer].map(Number).sort((a, b) => a - b);
        passed =
          sortedUser.length === sortedCorrect.length &&
          sortedUser.every((val, idx) => val === sortedCorrect[idx]);
      }
      break;
    }
    case 'short_answer': {
      const userStr = String(userAnswer).trim().toLowerCase();
      if (Array.isArray(q.correctAnswer)) {
        passed = q.correctAnswer.map((s) => String(s).trim().toLowerCase()).includes(userStr);
      } else {
        passed = userStr === String(q.correctAnswer).trim().toLowerCase();
      }
      break;
    }
    case 'code': {
      const codeStr = String(userAnswer).trim();
      const expectedStr = String(q.correctAnswer).trim();
      passed = codeStr.includes(expectedStr) || codeStr === expectedStr;
      break;
    }
    case 'ordering': {
      if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
        passed = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);
      }
      break;
    }
    case 'matching': {
      if (typeof userAnswer === 'object' && typeof q.correctAnswer === 'object') {
        passed = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);
      }
      break;
    }
    default: {
      passed = String(userAnswer) === String(q.correctAnswer);
    }
  }

  const score = passed ? maxScore : 0;

  return {
    passed,
    score,
    maxScore,
    explanation: q.explanation,
    userAnswer,
    correctAnswer: q.correctAnswer,
  };
}

/**
 * Centralized assessment scoring engine.
 */
export function calculateAssessmentScore(
  assessment: Assessment,
  answers: Record<string, unknown>,
  durationSeconds: number,
  attemptNumber: number = 1
): Omit<AssessmentAttempt, 'id' | 'user_id'> {
  let totalScore = 0;
  let totalMaxScore = 0;
  const questionResults: Record<string, QuestionResultItem> = {};

  assessment.questions.forEach((q) => {
    const res = evaluateQuestion(q, answers[q.id]);
    totalScore += res.score;
    totalMaxScore += res.maxScore;
    questionResults[q.id] = res;
  });

  const percentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
  const passed = percentage >= assessment.passingScorePercent;

  return {
    path_slug: assessment.pathSlug,
    assessment_id: assessment.id,
    assessment_slug: assessment.slug,
    attempt_number: attemptNumber,
    started_at: new Date(Date.now() - durationSeconds * 1000).toISOString(),
    submitted_at: new Date().toISOString(),
    duration_seconds: durationSeconds,
    score: totalScore,
    max_score: totalMaxScore,
    percentage,
    passed,
    answers,
    question_results: questionResults,
  };
}

/**
 * Evaluates certification eligibility for a path.
 */
export function isEligibleForCertification(
  path: Path,
  lessonProgressList: LessonProgress[] | Record<string, LessonProgress>,
  projectProgressMap: Record<string, ProjectProgress> = {},
  assessmentAttempts: AssessmentAttempt[] = []
): CertificationEligibility {
  const lessonMap: Record<string, LessonProgress> = Array.isArray(lessonProgressList)
    ? lessonProgressList.reduce((acc, item) => {
        acc[item.lesson_slug] = item;
        return acc;
      }, {} as Record<string, LessonProgress>)
    : lessonProgressList;

  const allLessons = path.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => lessonMap[l.slug]?.status === 'completed').length;
  const lessonPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 100;

  const totalProjects = path.projects ? path.projects.length : 0;
  const completedProjects = path.projects
    ? path.projects.filter((p) => projectProgressMap[p.slug]?.status === 'completed').length
    : 0;

  const pathAttempts = assessmentAttempts.filter((a) => a.path_slug === path.slug && a.passed);
  const assessmentPassed = pathAttempts.length > 0 || (path.assessments ? path.assessments.length === 0 : true);
  const maxAssessmentScore = pathAttempts.reduce((max, a) => Math.max(max, a.percentage), 0);

  const reasons: string[] = [];
  const req = path.certificationRequirement;

  // Development Course Blocking
  if (req?.certificationStatus === 'development' || req?.certificateEnabled === false) {
    reasons.push(
      req.developmentReason || 'Professional certification is currently in development for this course.'
    );
  }

  if (req?.requireLessonsCompleted && completedLessons < totalLessons) {
    reasons.push(`Complete all ${totalLessons} lessons (${completedLessons}/${totalLessons} completed)`);
  } else if (req?.minLessonCompletionPercent && lessonPercentage < req.minLessonCompletionPercent) {
    reasons.push(`Reach at least ${req.minLessonCompletionPercent}% lesson completion (current: ${lessonPercentage}%)`);
  }

  if (req?.requireProjectsCompleted && completedProjects < totalProjects) {
    reasons.push(`Complete all ${totalProjects} portfolio projects (${completedProjects}/${totalProjects} completed)`);
  }

  if (req?.requireFinalAssessmentPassed && !assessmentPassed) {
    reasons.push(`Pass the course final assessment with at least ${req.minFinalAssessmentScorePercent || req.minQuizScorePercent || 80}%`);
  } else if (req?.minFinalAssessmentScorePercent && maxAssessmentScore < req.minFinalAssessmentScorePercent) {
    reasons.push(`Score at least ${req.minFinalAssessmentScorePercent}% on final assessment (current best: ${maxAssessmentScore}%)`);
  }

  if (req?.minMasteryPercentage && Math.max(lessonPercentage, maxAssessmentScore) < req.minMasteryPercentage) {
    reasons.push(`Achieve overall course mastery of at least ${req.minMasteryPercentage}% (current: ${Math.max(lessonPercentage, maxAssessmentScore)}%)`);
  }

  const eligible = reasons.length === 0;

  return {
    eligible,
    reasons,
    courseId: path.slug,
    pathTitle: path.title,
    scorePercentage: Math.max(lessonPercentage, maxAssessmentScore),
    lessonsCompletedCount: completedLessons,
    totalLessonsCount: totalLessons,
    projectsCompletedCount: completedProjects,
    totalProjectsCount: totalProjects,
    assessmentPassed,
  };
}
