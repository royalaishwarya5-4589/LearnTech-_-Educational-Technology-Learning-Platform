'use client';

import React, { useState } from 'react';
import { Lesson } from '@/types/content';
import { Badge } from '@/components/Badge';

interface LessonContentPanelProps {
  lesson: Lesson;
  activeTab: 'concepts' | 'examples' | 'engineering' | 'quiz' | 'exercise';
  setActiveTab: (tab: 'concepts' | 'examples' | 'engineering' | 'quiz' | 'exercise') => void;
  conceptsCompleted: boolean;
  onToggleConceptsCompleted: () => void;
  quizScore: { total: number; correct: number; passed: boolean } | null;
  onQuizSubmitted: (score: { total: number; correct: number; passed: boolean }) => void;
  exercisePassed: boolean;
}

export function LessonContentPanel({
  lesson,
  activeTab,
  setActiveTab,
  conceptsCompleted,
  onToggleConceptsCompleted,
  quizScore,
  onQuizSubmitted,
  exercisePassed,
}: LessonContentPanelProps) {
  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Exercise hints state
  const [showHints, setShowHints] = useState(false);

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleEvaluateQuiz = () => {
    if (!lesson.quiz) return;
    let correctCount = 0;
    lesson.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    const passed = correctCount === lesson.quiz.length;
    setShowQuizResults(true);
    onQuizSubmitted({ total: lesson.quiz.length, correct: correctCount, passed });
  };

  const eng = lesson.engineeringContext;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}
    >
      {/* Main Content Body */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', lineHeight: 1.6, maxWidth: '960px', width: '100%', margin: '0 auto' }}>
        {/* 1. CONCEPTS */}
        {activeTab === 'concepts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {lesson.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                {lesson.description}
              </p>
            </div>

            {lesson.concepts.map((concept) => (
              <div key={concept.id} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {concept.title}
                </h3>
                <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                  {concept.contentMarkdown}
                </div>
              </div>
            ))}

            {/* References Links */}
            {lesson.references && lesson.references.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  📚 Documentation & References:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {lesson.references.map((ref, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem' }}>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
                        {ref.title}
                      </a>{' '}
                      <span style={{ color: 'var(--text-muted)' }}>({ref.sourceName})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mark as Read Toggle */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
              <button
                onClick={onToggleConceptsCompleted}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: conceptsCompleted ? '1px solid #10b981' : '1px solid var(--border-color)',
                  backgroundColor: conceptsCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-app)',
                  color: conceptsCompleted ? '#10b981' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {conceptsCompleted ? '✅ Marked as Read & Understood' : '📖 Mark Concepts as Read'}
              </button>
            </div>
          </div>
        )}

        {/* 2. EXAMPLES */}
        {activeTab === 'examples' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interactive Code Examples</h3>
            {lesson.examples.map((ex) => (
              <div
                key={ex.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-app)',
                }}
              >
                <h4 style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{ex.title}</h4>
                {ex.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{ex.description}</p>}
                <pre
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <code>{ex.code}</code>
                </pre>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    💡 <em>{ex.explanation}</em>
                  </p>
                  {lesson.exercise && (
                    <button
                      onClick={() => setActiveTab('exercise')}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.75rem',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface)',
                        color: 'var(--accent-primary)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Try in Practice Workbench ⚡
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ENTERPRISE ENGINEERING CONTEXT */}
        {activeTab === 'engineering' && eng && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              🏢 Enterprise Engineering Context & Production Blueprint
            </h3>

            {/* What & Why */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                1. What & Why It Exists
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                <strong>What:</strong> {eng.whatItIs}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <strong>Why:</strong> {eng.whyItExists}
              </p>
            </div>

            {/* How It Works */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                2. Internal Mechanics (How It Works)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
                {eng.howItWorks}
              </p>
            </div>

            {/* Industry & Production Usage */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                3. Industry & Production Scenarios
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                <strong>Where Used:</strong> {eng.whereUsedProfessionally}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                <strong>Enterprise Adoption:</strong> {eng.howCompaniesUseIt}
              </p>
              <h5 style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Production Considerations:
              </h5>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                {eng.productionConsiderations.map((pc, idx) => (
                  <li key={idx}>{pc}</li>
                ))}
              </ul>
            </div>

            {/* Mistakes & Edge Cases */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
              <h4 style={{ fontWeight: 600, color: '#ef4444', marginBottom: '0.4rem' }}>
                4. Common Mistakes & Engineering Pitfalls
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                {eng.commonEngineeringMistakes.map((cm, idx) => (
                  <li key={idx}>{cm}</li>
                ))}
              </ul>
            </div>

            {/* Performance & Security */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
              <h4 style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                5. Performance & Security Implications
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                ⚡ <strong>Performance:</strong> {eng.performanceImplications}
              </p>
              {eng.securityImplications && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  🛡️ <strong>Security:</strong> {eng.securityImplications}
                </p>
              )}
            </div>

            {/* When to Use vs When NOT to Use */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ border: '1px solid #10b981', borderRadius: 'var(--radius-md)', padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                <h5 style={{ fontWeight: 600, color: '#10b981', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                  ✅ When TO Use
                </h5>
                <ul style={{ paddingLeft: '1rem', fontSize: '0.8rem' }}>
                  {eng.whenToUse.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>
              <div style={{ border: '1px solid #ef4444', borderRadius: 'var(--radius-md)', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
                <h5 style={{ fontWeight: 600, color: '#ef4444', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                  ⚠️ When NOT to Use
                </h5>
                <ul style={{ paddingLeft: '1rem', fontSize: '0.8rem' }}>
                  {eng.whenNotToUse.map((wn, idx) => (
                    <li key={idx}>{wn}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alternatives & Trade-offs */}
            {eng.alternativesAndTradeOffs && eng.alternativesAndTradeOffs.length > 0 && (
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: 'var(--bg-app)' }}>
                <h4 style={{ fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                  6. Alternatives & Engineering Trade-offs
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {eng.alternativesAndTradeOffs.map((to, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
                      <strong>{to.option}:</strong> {to.comparison}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. QUIZ */}
        {activeTab === 'quiz' && lesson.quiz && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Check Your Knowledge</h3>
            {lesson.quiz.map((q, qIndex) => (
              <div
                key={q.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-app)',
                }}
              >
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  Q{qIndex + 1}: {q.question}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userAnswers[q.id] === optIndex;
                    const isCorrect = q.correctOptionIndex === optIndex;
                    let bg = 'var(--bg-surface)';
                    let border = '1px solid var(--border-color)';

                    if (showQuizResults) {
                      if (isCorrect) {
                        bg = 'rgba(16, 185, 129, 0.15)';
                        border = '1px solid #10b981';
                      } else if (isSelected && !isCorrect) {
                        bg = 'rgba(239, 68, 68, 0.15)';
                        border = '1px solid #ef4444';
                      }
                    } else if (isSelected) {
                      border = '1px solid var(--accent-primary)';
                      bg = 'rgba(59, 130, 246, 0.1)';
                    }

                    const optionStyle = {
                      padding: '0.6rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      border,
                      backgroundColor: bg,
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left' as const,
                    };

                    return (
                      <button
                        key={optIndex}
                        onClick={() => !showQuizResults && handleSelectQuizOption(q.id, optIndex)}
                        style={optionStyle}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showQuizResults && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={handleEvaluateQuiz}
              disabled={Object.keys(userAnswers).length < lesson.quiz.length}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                fontWeight: 600,
                cursor: Object.keys(userAnswers).length < lesson.quiz.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(userAnswers).length < lesson.quiz.length ? 0.6 : 1,
              }}
            >
              {showQuizResults ? 'Re-evaluate Quiz' : 'Check Answers'}
            </button>
          </div>
        )}

        {/* 4. EXERCISE */}
        {activeTab === 'exercise' && lesson.exercise && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Coding Exercise</h3>
              <Badge variant={exercisePassed ? 'success' : 'active'}>
                {exercisePassed ? 'Completed ✅' : 'In Progress'}
              </Badge>
            </div>

            <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
              {lesson.exercise.instructions}
            </div>

            {/* Test Case Expectations Preview */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Test Case Requirements ({lesson.exercise.testCases.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {lesson.exercise.testCases.map((tc, idx) => (
                  <div
                    key={tc.id || idx}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div>• {tc.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints Toggle */}
            {lesson.exercise.hints && lesson.exercise.hints.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <button
                  onClick={() => setShowHints(!showHints)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'transparent',
                    color: 'var(--accent-primary)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {showHints ? 'Hide Hints 🙈' : 'Need a Hint? 💡'}
                </button>
                {showHints && (
                  <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {lesson.exercise.hints.map((hint, idx) => (
                      <li key={idx}>{hint}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
