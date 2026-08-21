'use client';

import { useEffect } from 'react';
import { useAITutor } from './AITutorContext';

interface UseAITutorBridgeProps {
  pathSlug?: string;
  lessonSlug?: string;
  code?: string;
  logs?: string;
  title?: string;
}

export function useAITutorBridge({
  pathSlug,
  lessonSlug,
  code,
  logs,
  title,
}: UseAITutorBridgeProps) {
  const { updateActiveContext } = useAITutor();

  useEffect(() => {
    updateActiveContext({
      pathSlug,
      lessonSlug,
      code,
      logs,
      title,
    });
  }, [pathSlug, lessonSlug, code, logs, title, updateActiveContext]);
}
