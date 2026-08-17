'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Assessment, AssessmentQuestion } from '@/types/content';
import { AssessmentAttempt } from '@/types/user';
import { submitAssessmentAttempt } from '@/app/actions/assessments';
import { AssessmentResultsView } from './AssessmentResultsView';

interface AssessmentRunnerClientProps {
  assessment: Assessment;
  pathSlug: string;
}

const LOCAL_ATTEMPTS_KEY = 'learntech_guest_assessment_attempts';

export function AssessmentRunnerClient({ assessment, pathSlug }: AssessmentRunnerClientProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [startTime] = useState<number>(() => Date.now());
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(
    assessment.timeLimitMinutes ? assessment.timeLimitMinutes * 60 : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttempt | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleFinalSubmit = React.useCallback(async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const res = await submitAssessmentAttempt(pathSlug, assessment.slug, answers, durationSeconds);

    if (res.success && res.result) {
      setAttemptResult(res.result);

      // Save to guest storage if unauthenticated
      try {
        const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY) || '[]';
        const parsed = JSON.parse(raw);
        parsed.unshift(res.result);
        localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(parsed));
      } catch {
        // Ignore
      }
    }
    setIsSubmitting(false);
  }, [answers, assessment.slug, pathSlug, startTime]);

  // Timer countdown hook
  useEffect(() => {
    if (secondsRemaining === null || attemptResult !== null) return;

    if (secondsRemaining <= 0) {
      const timeoutId = setTimeout(() => {
        handleFinalSubmit();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, attemptResult, handleFinalSubmit]);

  // Questions randomization if configured
  const questions: AssessmentQuestion[] = assessment.questions;

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  function handleAnswerSelect(questionId: string, val: unknown) {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
  }

  function handleMultipleChoiceToggle(questionId: string, optionIndex: number) {
    const currentList = (answers[questionId] as number[]) || [];
    const updated = currentList.includes(optionIndex)
      ? currentList.filter((idx) => idx !== optionIndex)
      : [...currentList, optionIndex];
    setAnswers((prev) => ({ ...prev, [questionId]: updated }));
  }

  if (attemptResult) {
    return (
      <AssessmentResultsView
        assessment={assessment}
        attempt={attemptResult}
        onRetake={() => {
          setAttemptResult(null);
          setAnswers({});
          setCurrentIdx(0);
          setSecondsRemaining(assessment.timeLimitMinutes ? assessment.timeLimitMinutes * 60 : null);
        }}
      />
    );
  }

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem', maxWidth: '1000px' }}>
      {/* Assessment Header */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
            <Badge variant="active">{assessment.type.replace('_', ' ').toUpperCase()}</Badge>
            <Badge variant="level">{assessment.difficulty.toUpperCase()}</Badge>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {assessment.title}
          </h1>
        </div>

        {secondsRemaining !== null && (
          <div
            style={{
              backgroundColor: secondsRemaining < 60 ? '#ef44441f' : 'var(--bg-app)',
              border: secondsRemaining < 60 ? '1px solid #ef4444' : '1px solid var(--border-color)',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: secondsRemaining < 60 ? '#ef4444' : 'var(--text-main)',
            }}
          >
            ⏱️ {formatTimer(secondsRemaining)}
          </div>
        )}
      </div>

      {/* Progress Bar & Question Navigator */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <span>Question {currentIdx + 1} of {totalQuestions}</span>
          <span>{answeredCount} of {totalQuestions} Answered</span>
        </div>

        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
          <div
            style={{
              height: '100%',
              width: `${((currentIdx + 1) / totalQuestions) * 100}%`,
              backgroundColor: 'var(--accent-primary)',
              transition: 'width 0.2s ease',
            }}
          />
        </div>

        {/* Question Numbers Grid */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: isCurrent ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  backgroundColor: isCurrent ? 'var(--accent-primary)' : isAnswered ? '#10b9812f' : 'var(--bg-surface)',
                  color: isCurrent ? '#ffffff' : isAnswered ? '#10b981' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Card */}
      <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>
          QUESTION {currentIdx + 1} ({currentQ.points} POINTS)
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
          {currentQ.question}
        </h3>

        {currentQ.codeSnippet && (
          <pre
            style={{
              backgroundColor: '#0f172a',
              color: '#f8fafc',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              overflowX: 'auto',
              marginBottom: '1.5rem',
            }}
          >
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* Render Single Choice / True False / Scenario */}
        {(currentQ.type === 'single_choice' || currentQ.type === 'true_false' || currentQ.type === 'scenario') && currentQ.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleAnswerSelect(currentQ.id, optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--bg-app)' : 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid var(--accent-primary)' : '2px solid var(--border-color)',
                    }}
                  />
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Render Multiple Choice */}
        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((opt, optIdx) => {
              const selectedList = (answers[currentQ.id] as number[]) || [];
              const isSelected = selectedList.includes(optIdx);
              return (
                <button
                  key={optIdx}
                  onClick={() => handleMultipleChoiceToggle(currentQ.id, optIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--bg-app)' : 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                      border: isSelected ? 'none' : '2px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    {isSelected && '✓'}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Render Short Answer / Code Input */}
        {(currentQ.type === 'short_answer' || currentQ.type === 'code') && (
          <textarea
            rows={4}
            value={String(answers[currentQ.id] || '')}
            onChange={(e) => handleAnswerSelect(currentQ.id, e.target.value)}
            placeholder="Type your answer code/text here..."
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontFamily: currentQ.type === 'code' ? 'monospace' : 'inherit',
              fontSize: '0.95rem',
            }}
          />
        )}
      </Card>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          variant="outline"
        >
          ← Previous
        </Button>

        {currentIdx < totalQuestions - 1 ? (
          <Button onClick={() => setCurrentIdx((prev) => prev + 1)} variant="primary">
            Next Question →
          </Button>
        ) : (
          <Button onClick={() => setShowConfirmModal(true)} variant="primary">
            Submit Assessment ✓
          </Button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <Card style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Submit Assessment?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              You have answered {answeredCount} out of {totalQuestions} questions. Are you ready to submit your attempt?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                Review Questions
              </Button>
              <Button variant="primary" onClick={handleFinalSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Scoring...' : 'Confirm & Submit'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
