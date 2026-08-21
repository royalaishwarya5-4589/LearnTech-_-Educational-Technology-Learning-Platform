import { callAIProvider } from './provider';
import { buildSystemPrompt, buildUserPrompt, ChatHistoryItem, TutorMode } from './prompts';
import { resolveAIContext } from './context';
import { checkRateLimit } from './rateLimit';
import { verifyCode } from './codeVerifier';

export interface ProcessTutorRequestOptions {
  message: string;
  mode?: TutorMode;
  pathSlug?: string;
  lessonSlug?: string;
  code?: string;
  consoleOutput?: string;
  history?: ChatHistoryItem[];
  clientIp?: string;
  userSessionId?: string;
  isAuthenticated?: boolean;
  apiKey?: string;
  customProvider?: string;
  customModel?: string;
  isVoiceMode?: boolean;
}

export interface ProcessTutorResponse {
  success: boolean;
  message?: string;
  error?: string;
  contextSummary?: string;
  provider?: string;
  isFallback?: boolean;
}

export async function processTutorRequest(
  options: ProcessTutorRequestOptions
): Promise<ProcessTutorResponse> {
  const {
    message,
    mode = 'TUTOR',
    pathSlug,
    lessonSlug,
    code,
    consoleOutput,
    history = [],
    clientIp = '127.0.0.1',
    userSessionId,
    isAuthenticated = false,
    apiKey,
    customProvider,
    customModel,
    isVoiceMode = false,
  } = options;

  // 1. Rate Limit Check
  const rateLimitKey = userSessionId || clientIp;
  const { allowed } = checkRateLimit(rateLimitKey, 25);
  if (!allowed) {
    return {
      success: false,
      error: "You've reached the temporary request limit. Please wait a moment and try again.",
    };
  }

  // 2. Input Sanitization
  const sanitizedMessage = (message || '').trim().slice(0, 4000);
  if (!sanitizedMessage) {
    return {
      success: false,
      error: 'Please enter a valid question or select a quick action.',
    };
  }

  const sanitizedCode = (code || '').trim().slice(0, 10000);
  const sanitizedLogs = (consoleOutput || '').trim().slice(0, 5000);

  // 3. Resolve Extended Context & Code Verification
  const resolvedCtx = resolveAIContext(pathSlug, lessonSlug);
  const codeCheck = verifyCode(sanitizedCode, resolvedCtx.language || 'python');

  // 4. Build Prompts
  const systemPrompt = buildSystemPrompt({
    mode,
    courseTitle: resolvedCtx.courseTitle,
    moduleTitle: resolvedCtx.moduleTitle,
    lessonTitle: resolvedCtx.lessonTitle,
    learnerLevel: resolvedCtx.learnerLevel,
    exercisePrompt: resolvedCtx.exercisePrompt,
    prevLessonTitle: resolvedCtx.prevLesson?.title,
    isVoiceMode,
    isAuthenticated,
  });

  const userPrompt = buildUserPrompt(
    sanitizedMessage,
    sanitizedCode,
    sanitizedLogs,
    history,
    resolvedCtx.formattedLessonContent,
    codeCheck.executionAnalysis
  );

  // 5. Execute AI Call
  try {
    const aiResult = await callAIProvider(
      {
        systemPrompt,
        userPrompt,
        maxTokens: isVoiceMode ? 600 : 1200,
        temperature: 0.3,
        history,
        clientApiKey: apiKey,
        clientProvider: customProvider,
        clientModel: customModel,
      },
      {
        resolvedCtx,
        userMessage: sanitizedMessage,
        mode,
        code: sanitizedCode,
        consoleOutput: sanitizedLogs,
        history,
      }
    );

    return {
      success: true,
      message: aiResult.text,
      contextSummary: resolvedCtx.contextSummary,
      provider: aiResult.provider,
      isFallback: aiResult.isFallback,
    };
  } catch (error) {
    console.error('[AI Tutor] Processing error:', error);
    return {
      success: false,
      error: 'The AI Tutor is temporarily unavailable. Please try again in a moment.',
    };
  }
}
