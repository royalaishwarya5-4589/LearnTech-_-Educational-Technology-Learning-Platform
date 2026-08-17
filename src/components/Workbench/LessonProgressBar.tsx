'use client';

import React from 'react';
import { Lesson } from '@/types/content';
import { LessonProgress } from '@/types/user';

interface LessonProgressBarProps {
  lesson: Lesson;
  progress: Partial<LessonProgress>;
  activeTab: 'concepts' | 'examples' | 'engineering' | 'quiz' | 'exercise';
  setActiveTab: (tab: 'concepts' | 'examples' | 'engineering' | 'quiz' | 'exercise') => void;
}

export function LessonProgressBar({
  lesson,
  progress,
  activeTab,
  setActiveTab,
}: LessonProgressBarProps) {
  const hasQuiz = !!(lesson.quiz && lesson.quiz.length > 0);
  const hasExercise = !!lesson.exercise;

  const conceptsDone = !!progress.concepts_completed;
  const quizDone = !!progress.quiz_completed;
  const exerciseDone = !!progress.exercise_completed;
  // Examples viewed state (defaults to true if user selected examples tab or completed concepts)
  const examplesDone = conceptsDone || activeTab === 'examples';

  // Calculate percentage
  let totalSteps = 2; // Concepts + Examples
  let completedSteps = (conceptsDone ? 1 : 0) + (examplesDone ? 1 : 0);

  if (hasQuiz) {
    totalSteps++;
    if (quizDone) completedSteps++;
  }
  if (hasExercise) {
    totalSteps++;
    if (exerciseDone) completedSteps++;
  }

  const percentage = Math.round((completedSteps / totalSteps) * 100);

  const hasEng = !!lesson.engineeringContext;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '0.6rem 1.25rem',
        backgroundColor: 'var(--bg-app)',
        borderBottom: '1px solid var(--border-color)',
        fontSize: '0.85rem',
      }}
    >
      {/* Progress Bar & Percentage */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 220px' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          Progress
        </span>
        <div
          style={{
            flex: '1 1 120px',
            maxWidth: '180px',
            height: '8px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? '#10b981' : 'var(--accent-primary)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ fontWeight: 700, color: percentage === 100 ? '#10b981' : 'var(--text-main)' }}>
          {percentage}%
        </span>
      </div>

      {/* Individual Activity Tabs with Active Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          overflowX: 'auto',
          maxWidth: '100%',
          paddingBottom: '0.1rem',
        }}
      >
        <button
          onClick={() => setActiveTab('concepts')}
          className="btn-interactive"
          style={{
            border: activeTab === 'concepts' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
            backgroundColor: activeTab === 'concepts' ? 'var(--bg-surface)' : conceptsDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)',
            color: activeTab === 'concepts' ? 'var(--accent-primary)' : conceptsDone ? '#10b981' : 'var(--text-main)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: activeTab === 'concepts' ? 700 : 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            whiteSpace: 'nowrap',
          }}
        >
          📖 Concepts {conceptsDone && '✓'}
        </button>

        <button
          onClick={() => setActiveTab('examples')}
          className="btn-interactive"
          style={{
            border: activeTab === 'examples' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
            backgroundColor: activeTab === 'examples' ? 'var(--bg-surface)' : examplesDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)',
            color: activeTab === 'examples' ? 'var(--accent-primary)' : examplesDone ? '#10b981' : 'var(--text-main)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: activeTab === 'examples' ? 700 : 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            whiteSpace: 'nowrap',
          }}
        >
          💡 Examples ({lesson.examples.length}) {examplesDone && '✓'}
        </button>

        {hasEng && (
          <button
            onClick={() => setActiveTab('engineering')}
            className="btn-interactive"
            style={{
              border: activeTab === 'engineering' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'engineering' ? 'var(--bg-surface)' : 'var(--bg-surface)',
              color: activeTab === 'engineering' ? 'var(--accent-primary)' : 'var(--text-main)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: activeTab === 'engineering' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              whiteSpace: 'nowrap',
            }}
          >
            🏢 Enterprise Context
          </button>
        )}

        {hasQuiz && (
          <button
            onClick={() => setActiveTab('quiz')}
            className="btn-interactive"
            style={{
              border: activeTab === 'quiz' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'quiz' ? 'var(--bg-surface)' : quizDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)',
              color: activeTab === 'quiz' ? 'var(--accent-primary)' : quizDone ? '#10b981' : 'var(--text-main)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: activeTab === 'quiz' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              whiteSpace: 'nowrap',
            }}
          >
            ❓ Quiz {quizDone && '✓'}
          </button>
        )}

        {hasExercise && (
          <button
            onClick={() => setActiveTab('exercise')}
            className="btn-interactive"
            style={{
              border: activeTab === 'exercise' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              backgroundColor: activeTab === 'exercise' ? 'rgba(59, 130, 246, 0.15)' : exerciseDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)',
              color: activeTab === 'exercise' ? 'var(--accent-primary)' : exerciseDone ? '#10b981' : 'var(--text-main)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: activeTab === 'exercise' ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              whiteSpace: 'nowrap',
            }}
          >
            💻 Practice Exercise {exerciseDone && '✓'}
          </button>
        )}
      </div>
    </div>
  );
}
