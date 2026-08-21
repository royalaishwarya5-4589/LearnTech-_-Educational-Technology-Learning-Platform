import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processTutorRequest } from '@/lib/ai/tutor';
import { TutorMode } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      message,
      mode = 'TUTOR',
      pathSlug,
      lessonSlug,
      code,
      consoleOutput,
      history,
      apiKey,
      provider,
      model,
      isVoiceMode,
    } = body;

    let userId: string | undefined;
    let isAuthenticated = false;

    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        userId = user.id;
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const result = await processTutorRequest({
      message,
      mode: mode as TutorMode,
      pathSlug,
      lessonSlug,
      code,
      consoleOutput,
      history,
      clientIp,
      userSessionId: userId,
      isAuthenticated,
      apiKey,
      customProvider: provider,
      customModel: model,
      isVoiceMode: Boolean(isVoiceMode),
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 429 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      contextSummary: result.contextSummary,
      provider: result.provider,
      isFallback: result.isFallback,
    });
  } catch (error) {
    console.error('[API Route /api/ai-tutor] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process your request right now. Please try again.',
      },
      { status: 500 }
    );
  }
}
