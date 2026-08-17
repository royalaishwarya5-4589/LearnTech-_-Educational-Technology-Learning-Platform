'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { fetchLessonProgress, saveLessonProgress, recordExerciseSubmission, migrateGuestProgress } from '@/app/actions/progress';
import { LessonProgress, ExerciseSubmission } from '@/types/user';

const LOCAL_STORAGE_KEY = 'learntech_guest_progress';

import { recordGuestActivity } from '@/lib/streak';

export function useProgress(pathSlug: string, lessonSlug: string) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Partial<LessonProgress>>({
    concepts_completed: false,
    quiz_completed: false,
    quiz_score: 0,
    quiz_total: 0,
    exercise_completed: false,
    last_code_submitted: null,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSource, setSyncSource] = useState<'cloud' | 'local' | 'failed' | 'offline'>('local');

  // Load progress on mount or auth change
  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      setIsSyncing(true);

      if (user) {
        setSyncSource('cloud');
        // Check for guest local progress to migrate first
        try {
          const guestDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (guestDataStr) {
            const guestMap = JSON.parse(guestDataStr) as Record<string, LessonProgress>;
            const guestList = Object.values(guestMap);
            if (guestList.length > 0) {
              const res = await migrateGuestProgress(guestList);
              if (res?.success) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
              }
            }
          }
        } catch {
          // Ignore localStorage errors
        }

        // Fetch cloud progress for current lesson
        try {
          const cloudRecord = await fetchLessonProgress(pathSlug, lessonSlug);
          if (isMounted && cloudRecord) {
            setProgress(cloudRecord);
          }
        } catch {
          if (isMounted) setSyncSource('failed');
        }
      } else {
        setSyncSource('local');
        // Load from localStorage for guest
        try {
          const guestDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (guestDataStr) {
            const guestMap = JSON.parse(guestDataStr) as Record<string, LessonProgress>;
            const key = `${pathSlug}:${lessonSlug}`;
            if (guestMap[key]) {
              if (isMounted) setProgress(guestMap[key]);
            }
          }
        } catch {
          // Ignore localStorage errors
        }
      }

      if (isMounted) setIsSyncing(false);
    }

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, [user, pathSlug, lessonSlug]);

  // Helper to save progress locally or to cloud
  const saveProgressState = useCallback(async (updated: Partial<LessonProgress>) => {
    const newProgress = { ...progress, ...updated };
    setProgress(newProgress);

    if (user) {
      setIsSyncing(true);
      try {
        const res = await saveLessonProgress(pathSlug, lessonSlug, updated);
        if (res?.success) {
          setSyncSource('cloud');
        } else {
          setSyncSource('failed');
        }
      } catch {
        setSyncSource('failed');
      } finally {
        setIsSyncing(false);
      }
    } else {
      setSyncSource('local');
      try {
        recordGuestActivity();
        const guestDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        const guestMap: Record<string, LessonProgress> = guestDataStr ? JSON.parse(guestDataStr) : {};
        const key = `${pathSlug}:${lessonSlug}`;
        guestMap[key] = {
          ...(guestMap[key] || {}),
          path_slug: pathSlug,
          lesson_slug: lessonSlug,
          ...newProgress,
          status: newProgress.exercise_completed ? 'completed' : 'in_progress',
          last_accessed_at: new Date().toISOString(),
        } as LessonProgress;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestMap));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [user, pathSlug, lessonSlug, progress]);

  // Record an exercise submission
  const submitExercise = useCallback(async (
    exerciseId: string,
    submittedCode: string,
    passed: boolean,
    testResults?: unknown,
    executionTimeMs?: number
  ) => {
    const submissionData: Omit<ExerciseSubmission, 'id' | 'user_id' | 'created_at'> = {
      path_slug: pathSlug,
      lesson_slug: lessonSlug,
      exercise_id: exerciseId,
      submitted_code: submittedCode,
      passed,
      test_results: testResults,
      execution_time_ms: executionTimeMs,
    };

    if (passed) {
      await saveProgressState({
        exercise_completed: true,
        last_code_submitted: submittedCode,
      });
    }

    if (user) {
      try {
        await recordExerciseSubmission(submissionData);
      } catch {
        // Safe catch for network failures
      }
    }
  }, [user, pathSlug, lessonSlug, saveProgressState]);

  return {
    progress,
    isSyncing,
    syncSource,
    saveProgressState,
    submitExercise,
  };
}

