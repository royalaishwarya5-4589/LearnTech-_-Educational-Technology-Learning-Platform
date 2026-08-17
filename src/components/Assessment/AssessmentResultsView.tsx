'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Assessment } from '@/types/content';
import { AssessmentAttempt } from '@/types/user';

interface AssessmentResultsViewProps {
  assessment: Assessment;
  attempt: AssessmentAttempt;
  onRetake: () => void;
}

export function AssessmentResultsView({ assessment, attempt, onRetake }: AssessmentResultsViewProps) {
  const isPassed = attempt.passed;

  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem', maxWidth: '900px' }}>
      {/* Result Hero Banner */}
      <Card
        style={{
          padding: '2.5rem',
          textAlign: 'center',
          marginBottom: '2.5rem',
          border: isPassed ? '2px solid #10b981' : '2px solid #ef4444',
          backgroundColor: isPassed ? '#10b9810a' : '#ef44440a',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {isPassed ? '🎉' : '⚠️'}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Badge variant={isPassed ? 'success' : 'warning'}>
            {isPassed ? 'PASSED ASSESSMENT' : 'NEEDS IMPROVEMENT'}
          </Badge>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          {attempt.percentage}% Score
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
          {isPassed
            ? `Congratulations! You scored ${attempt.score} out of ${attempt.max_score} points, exceeding the ${assessment.passingScorePercent}% passing threshold.`
            : `You scored ${attempt.score} out of ${attempt.max_score} points. A minimum score of ${assessment.passingScorePercent}% is required to pass.`}
        </p>

        {/* Metrics Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>ATTEMPT</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>#{attempt.attempt_number}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>TIME TAKEN</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{Math.floor(attempt.duration_seconds / 60)}m {attempt.duration_seconds % 60}s</span>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>PASS THRESHOLD</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{assessment.passingScorePercent}%</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <Button onClick={onRetake} variant="outline">
          🔄 Retake Assessment
        </Button>
        <Button href={`/paths/${assessment.pathSlug}`} variant="primary">
          Continue Learning Path →
        </Button>
      </div>

      {/* Detailed Question Breakdown */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Detailed Question Breakdown</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {assessment.questions.map((q, idx) => {
          const res = attempt.question_results?.[q.id];
          const passed = res?.passed ?? false;

          return (
            <Card
              key={q.id}
              style={{
                padding: '1.5rem',
                borderLeft: passed ? '4px solid #10b981' : '4px solid #ef4444',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  QUESTION {idx + 1}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: passed ? '#10b981' : '#ef4444',
                    backgroundColor: passed ? '#10b9811f' : '#ef44441f',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                  }}
                >
                  {passed ? `✓ Correct (+${q.points} pts)` : `✗ Incorrect (0/${q.points} pts)`}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                {q.question}
              </h4>

              <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
