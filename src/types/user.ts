export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  institution_name?: string | null;
  student_id?: string | null;
  avatar_url: string | null;
  streak_count: number;
  last_active_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id?: string;
  user_id?: string;
  path_slug: string;
  lesson_slug: string;
  status: 'not_started' | 'in_progress' | 'completed';
  concepts_completed: boolean;
  quiz_completed: boolean;
  quiz_score: number;
  quiz_total: number;
  exercise_completed: boolean;
  last_code_submitted?: string | null;
  last_accessed_at: string;
  completed_at?: string | null;
}

export interface ExerciseSubmission {
  id?: string;
  user_id?: string;
  path_slug: string;
  lesson_slug: string;
  exercise_id: string;
  submitted_code: string;
  passed: boolean;
  test_results?: unknown;
  execution_time_ms?: number;
  created_at?: string;
}

export interface ProjectProgress {
  id?: string;
  user_id?: string;
  path_slug: string;
  project_slug: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completed_milestones: string[];
  progress_percent: number;
  started_at?: string | null;
  completed_at?: string | null;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'lesson' | 'exercise' | 'project' | 'streak' | 'mastery';
  unlockedAt?: string | null;
  isUnlocked: boolean;
}

export interface MasteryBreakdown {
  overallPercentage: number;
  lessonsCompleted: number;
  totalLessons: number;
  exercisesSolved: number;
  totalExercises: number;
  quizzesPassed: number;
  totalQuizzes: number;
  projectsCompleted: number;
  totalProjects: number;
}

export interface NextActivityItem {
  type: 'lesson' | 'project' | 'exercise';
  title: string;
  subtitle: string;
  pathSlug: string;
  itemSlug: string;
  url: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'lesson_completed' | 'exercise_passed' | 'exercise_attempted' | 'quiz_completed' | 'project_completed' | 'project_milestone' | 'assessment_passed' | 'assessment_failed' | 'certificate_earned' | 'achievement_unlocked';
  title: string;
  timestamp: string;
  lessonSlug?: string;
  projectSlug?: string;
  pathSlug: string;
}

export interface QuestionResultItem {
  passed: boolean;
  score: number;
  maxScore: number;
  explanation: string;
  userAnswer: unknown;
  correctAnswer: unknown;
}

export interface AssessmentAttempt {
  id?: string;
  user_id?: string;
  path_slug: string;
  assessment_id: string;
  assessment_slug: string;
  attempt_number: number;
  started_at: string;
  submitted_at?: string | null;
  duration_seconds: number;
  score: number;
  max_score: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, unknown>;
  question_results: Record<string, QuestionResultItem>;
}

export interface CertificationEligibility {
  eligible: boolean;
  reasons: string[];
  courseId: string;
  pathTitle: string;
  scorePercentage: number;
  lessonsCompletedCount: number;
  totalLessonsCount: number;
  projectsCompletedCount: number;
  totalProjectsCount: number;
  assessmentPassed: boolean;
}

export interface Certificate {
  id: string;
  certificate_id: string;
  user_id: string;
  path_slug: string;
  course_title: string;
  learner_name: string;
  issued_at: string;
  final_score: number;
  mastery_percentage: number;
  certificate_status: 'issued' | 'revoked';
  verification_hash: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  revocation_reason?: string | null;
}

export interface CertificateAuditLog {
  id: string;
  certificate_id: string;
  action: 'issued' | 'revoked' | 'reissued';
  actor_id?: string;
  reason?: string;
  created_at: string;
}

export interface DashboardStats {
  totalLessonsCompleted: number;
  totalExercisesSolved: number;
  totalQuizzesTaken: number;
  totalProjectsCompleted: number;
  projectsInProgressCount: number;
  quizAccuracyPercentage: number;
  currentStreakDays: number;
  lastActiveDate?: string | null;
  mastery: MasteryBreakdown;
  nextRecommendedActivity: NextActivityItem | null;
  pathProgress: {
    pathSlug: string;
    title: string;
    totalLessons: number;
    completedLessons: number;
    percentage: number;
    nextLesson: {
      lessonSlug: string;
      title: string;
      moduleTitle: string;
    } | null;
  }[];
  recentSubmissions: ExerciseSubmission[];
  recentActivity: RecentActivityItem[];
  achievements: Achievement[];
  projectProgressMap: Record<string, ProjectProgress>;
  recentAssessmentAttempts?: AssessmentAttempt[];
  certificationEligibilityMap?: Record<string, CertificationEligibility>;
  userCertificates?: Certificate[];
}

export interface CourseAnalytics {
  pathSlug: string;
  title: string;
  readinessState: 'ready' | 'development';
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  completedExercises: number;
  totalExercises: number;
  completedProjects: number;
  requiredProjects: number;
  masteryPercentage: number;
  assessmentsAttempted: number;
  bestAssessmentScore: number | null;
  certificationStatus: 'eligible' | 'issued' | 'not_eligible' | 'in_development';
  certificationEligibility: CertificationEligibility;
}

export interface AssessmentAnalytics {
  assessmentId: string;
  assessmentTitle: string;
  pathSlug: string;
  pathTitle: string;
  totalAttempts: number;
  bestScore: number | null;
  latestScore: number | null;
  averageScore: number | null;
  passedCount: number;
  failedCount: number;
  bestDurationSeconds: number | null;
  history: AssessmentAttempt[];
}

export interface LearnerAnalyticsReport {
  totalCoursesStarted: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  totalExercisesCompleted: number;
  totalProjectsCompleted: number;
  totalAssessmentAttempts: number;
  uniqueAssessmentsAttempted: number;
  passedAssessmentsCount: number;
  certificatesEarnedCount: number;
  currentStreak: number;
  longestStreak: number;
  overallMasteryPercentage: number;
  averageAssessmentScore: number | null;
  courses: CourseAnalytics[];
  assessments: AssessmentAnalytics[];
  recentActivities: RecentActivityItem[];
}



