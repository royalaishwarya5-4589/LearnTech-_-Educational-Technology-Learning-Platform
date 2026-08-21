import { getPathBySlug, getLessonDetails } from '@/content';
import { Path, Lesson, QuizQuestion } from '@/types/content';

export interface AIResolvedContext {
  courseTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  learnerLevel: string;
  language: string;
  exercisePrompt?: string;
  exercise?: {
    initialCode?: string;
    instructions?: string;
    hints?: string[];
  };
  concepts?: Array<{ title: string; contentMarkdown: string }>;
  examples?: Array<{ title: string; code: string; explanation: string }>;
  quiz?: QuizQuestion[];
  prevLesson?: { title: string; description?: string };
  nextLesson?: { title: string; description?: string };
  formattedLessonContent: string;
  contextSummary: string;
}

export function resolveAIContext(pathSlug?: string, lessonSlug?: string): AIResolvedContext {
  if (!pathSlug || !lessonSlug) {
    return {
      courseTitle: 'General Software Engineering',
      moduleTitle: 'Core Fundamentals',
      lessonTitle: 'Programming Foundations',
      learnerLevel: 'Beginner',
      language: 'python',
      formattedLessonContent: 'General software engineering workspace.',
      contextSummary: 'General Software Engineering',
    };
  }

  const pathObj = getPathBySlug(pathSlug) as Path | undefined;
  const lessonData = getLessonDetails(pathSlug, lessonSlug);

  if (!pathObj || !lessonData) {
    return {
      courseTitle: pathSlug.charAt(0).toUpperCase() + pathSlug.slice(1),
      moduleTitle: 'Core Concepts',
      lessonTitle: lessonSlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      learnerLevel: 'Beginner',
      language: pathSlug.toLowerCase().includes('javascript') ? 'javascript' : 'python',
      formattedLessonContent: `Lesson context for ${lessonSlug}`,
      contextSummary: `${pathSlug} • ${lessonSlug}`,
    };
  }

  const { lesson, module, prevLesson, nextLesson } = lessonData as {
    lesson: Lesson;
    module: { title: string };
    prevLesson?: Lesson;
    nextLesson?: Lesson;
  };
  const language = pathObj.slug.toLowerCase().includes('javascript') ? 'javascript' : 'python';

  let formattedContent = `Lesson Title: ${lesson.title}\n`;
  formattedContent += `Course: ${pathObj.title}\n`;
  formattedContent += `Module: ${module.title}\n\n`;

  if (lesson.concepts && lesson.concepts.length > 0) {
    formattedContent += `### Core Concepts:\n`;
    for (const c of lesson.concepts) {
      formattedContent += `#### ${c.title}\n${c.contentMarkdown}\n\n`;
    }
  }

  if (lesson.examples && lesson.examples.length > 0) {
    formattedContent += `### Verified Code Examples:\n`;
    for (const ex of lesson.examples) {
      formattedContent += `#### ${ex.title}\n\`\`\`${language}\n${ex.code}\n\`\`\`\n${ex.explanation}\n\n`;
    }
  }

  if (lesson.exercise) {
    formattedContent += `### Current Exercise Instructions:\n${lesson.exercise.instructions}\n`;
    if (lesson.exercise.initialCode) {
      formattedContent += `Initial Starter Code:\n\`\`\`${language}\n${lesson.exercise.initialCode}\n\`\`\`\n`;
    }
  }

  return {
    courseTitle: pathObj.title,
    moduleTitle: module.title,
    lessonTitle: lesson.title,
    learnerLevel: pathObj.difficulty || 'Beginner',
    language,
    exercisePrompt: lesson.exercise?.instructions,
    exercise: lesson.exercise,
    concepts: lesson.concepts,
    examples: lesson.examples,
    quiz: lesson.quiz,
    prevLesson: prevLesson ? { title: prevLesson.title, description: prevLesson.description } : undefined,
    nextLesson: nextLesson ? { title: nextLesson.title, description: nextLesson.description } : undefined,
    formattedLessonContent: formattedContent,
    contextSummary: `${pathObj.title} → ${module.title} → ${lesson.title}`,
  };
}
