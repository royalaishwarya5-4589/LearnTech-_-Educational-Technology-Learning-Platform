export type LevelId =
  | 'absolute_beginner'
  | 'beginner'
  | 'foundations'
  | 'intermediate'
  | 'advanced'
  | 'professional'
  | 'backend'
  | 'industry_mastery'
  | 'capstone'
  | 'projects'
  | 'interview';

export type CourseType = 'coding' | 'non_coding' | 'conceptual' | 'hybrid';
export type CourseStatus = 'draft' | 'active' | 'coming_soon';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional' | 'mastery' | 'capstone';
export type LessonType = 'coding' | 'conceptual' | 'quiz_only' | 'project_checkpoint' | 'assessment';

export interface ReferenceLink {
  title: string;
  url: string;
  sourceName: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface TestCase {
  id: string;
  description: string;
  input?: unknown;
  expectedOutput: unknown;
  isHidden?: boolean;
}

export type ExerciseValidationType = 'stdout' | 'function' | 'multiple_choice' | 'text_match' | 'query';

export interface CodingExercise {
  id: string;
  instructions: string;
  initialCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hints: string[];
  validationType?: ExerciseValidationType;
  functionName?: string;
  language?: string;
}

export interface ConceptSection {
  id: string;
  title: string;
  contentMarkdown: string;
}

export interface ExampleSnippet {
  id: string;
  title: string;
  description?: string;
  code: string;
  explanation: string;
  language?: string;
}

export interface CompletionCriteria {
  requiresConceptsRead: boolean;
  requiresQuizPassed: boolean;
  requiresExercisePassed: boolean;
  minQuizScorePercentage?: number;
}

export interface TradeOffItem {
  option: string;
  comparison: string;
}

export interface EngineeringContext {
  whatItIs: string;
  whyItExists: string;
  howItWorks: string;
  whereUsedProfessionally: string;
  howCompaniesUseIt: string;
  productionConsiderations: string[];
  commonEngineeringMistakes: string[];
  performanceImplications: string;
  securityImplications?: string;
  alternativesAndTradeOffs: TradeOffItem[];
  whenToUse: string[];
  whenNotToUse: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  orderIndex: number;
  concepts: ConceptSection[];
  examples: ExampleSnippet[];
  quiz?: QuizQuestion[];
  exercise?: CodingExercise;
  references: ReferenceLink[];
  completionCriteria: CompletionCriteria;
  prerequisites: string[]; // Lesson IDs required before this lesson
  lessonType?: LessonType;
  mentalModel?: string;
  engineeringContext?: EngineeringContext;
  videoNotes?: string;
}

export type AssessmentType =
  | 'practice'
  | 'lesson_quiz'
  | 'module_assessment'
  | 'course_assessment'
  | 'certification_assessment'
  | 'interview_assessment';

export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'true_false'
  | 'short_answer'
  | 'code'
  | 'scenario'
  | 'ordering'
  | 'matching';

export interface AssessmentQuestion {
  id: string;
  assessmentId?: string;
  type: QuestionType;
  question: string;
  explanation: string;
  points: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  options?: string[];
  correctAnswer: number | number[] | boolean | string | string[];
  codeSnippet?: string;
  matchingPairs?: { left: string; right: string }[];
  orderingItems?: string[];
}

export interface Assessment {
  id: string;
  slug: string;
  title: string;
  description: string;
  pathSlug: string;
  associatedModuleSlug?: string;
  associatedLessonSlug?: string;
  type: AssessmentType;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mastery';
  passingScorePercent: number;
  timeLimitMinutes?: number;
  maxAttempts?: number;
  randomizeQuestions?: boolean;
  questions: AssessmentQuestion[];
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: LevelId | string;
  orderIndex: number;
  lessons: Lesson[];
  assessment?: Assessment;
}

export interface LevelDefinition {
  id: LevelId | string;
  title: string;
  shortDescription: string;
  badgeLabel: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  hints?: string[];
  orderIndex: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'capstone';
  estimatedHours: number;
  skillsLearned: string[];
  prerequisites: string[];
  learningObjectives: string[];
  starterCode?: string;
  projectInstructionsMarkdown: string;
  milestones: ProjectMilestone[];
  completionCriteria: string;
  pathSlug: string;
  associatedModuleSlug?: string;
  associatedLessonSlugs?: string[];
}

export type CertificationStatus = 'ready' | 'development';

export interface CertificationRequirement {
  pathSlug?: string;
  certificationStatus: CertificationStatus;
  certificateEnabled: boolean;
  duration?: string;
  startDate?: string;
  endDate?: string;
  requireLessonsCompleted?: boolean;
  minLessonCompletionPercent?: number;
  minQuizScorePercent?: number;
  minExercisesPassedPercent?: number;
  requireProjectsCompleted?: boolean;
  requiredProjectSlugs?: string[];
  minMasteryPercentage?: number;
  requireFinalAssessmentPassed?: boolean;
  requiredAssessmentSlugs?: string[];
  minFinalAssessmentScorePercent?: number;
  certificateType: 'completion' | 'mastery';
  skillsCovered: string[];
  developmentReason?: string;
}


export interface Path {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: 'programming' | 'cs' | 'web' | 'ai' | 'security' | 'career';
  categoryLabel: string;
  isActive: boolean;
  status?: CourseStatus;
  courseType?: CourseType;
  difficulty?: DifficultyLevel;
  estimatedHours: number;
  totalLessons: number;
  totalProjects: number;
  duration?: string;
  startDate?: string;
  endDate?: string;
  modules: Module[];
  projects?: Project[];
  assessments?: Assessment[];
  certificationRequirement?: CertificationRequirement;
}

// Alias Path as Course for multi-course architecture domain clarity
export type Course = Path;
export type CourseModule = Module;


