'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { AssessmentAttempt, CertificationEligibility } from '@/types/user';

interface AssessmentOverviewProps {
  attempts: AssessmentAttempt[];
  eligibilityMap?: Record<string, CertificationEligibility>;
}

function formatDateDDMMYYYY(dateString?: string | null): string {
  if (!dateString) return 'N/A';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'N/A';

  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function AssessmentOverview({ attempts, eligibilityMap = {} }: AssessmentOverviewProps) {
  const passedAttempts = attempts.filter((a) => a.passed);
  const bestScore = attempts.reduce((max, a) => Math.max(max, a.percentage), 0);

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
          📝 Assessment Center & Certification Readiness
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {passedAttempts.length} Assessments Passed
        </span>
      </div>

      {/* Stats row */}
      <div className="card-grid" style={{ marginBottom: '1.5rem' }}>
        <Card>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>TOTAL ATTEMPTS</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{attempts.length}</span>
        </Card>

        <Card>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>BEST SCORE</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{bestScore}%</span>
        </Card>

        <Card>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>PASSED CERTIFICATIONS</span>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{passedAttempts.length}</span>
        </Card>
      </div>

      {/* Recent Attempts List */}
      {attempts.length > 0 ? (
        <Card style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent Assessment Attempts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {attempts.slice(0, 5).map((att) => (
              <div
                key={att.id || `${att.assessment_id}-${att.attempt_number}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-md)',
                  border: att.passed ? '1px solid #10b981' : '1px solid var(--border-color)',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{att.assessment_slug}</span>
                    <Badge variant={att.passed ? 'success' : 'warning'}>
                      {att.passed ? 'PASSED' : 'FAILED'}
                    </Badge>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Attempt #{att.attempt_number} • {formatDateDDMMYYYY(att.started_at)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: att.passed ? '#10b981' : 'var(--text-main)' }}>
                    {att.percentage}%
                  </span>
                  <Button href={`/paths/${att.path_slug}/assessments/${att.assessment_slug}`} variant="outline" size="sm">
                    View / Retake →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '1rem' }}>No assessment attempts recorded yet. Challenge yourself with a course assessment!</p>
          <Button href="/paths/python/assessments/python-mastery-final-exam" variant="primary" size="sm">
            Take Python Final Exam →
          </Button>
        </Card>
      )}

      {/* Certification Readiness Cards */}
      {Object.keys(eligibilityMap).length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Certification Requirements Status</h3>
          <div className="card-grid">
            {Object.values(eligibilityMap).map((elig) => (
              <Card key={elig.courseId} style={{ border: elig.eligible ? '2px solid #10b981' : '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{elig.pathTitle}</h4>
                  <Badge variant={elig.eligible ? 'success' : 'roadmap'}>
                    {elig.eligible ? 'Eligible' : 'In Progress'}
                  </Badge>
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  {elig.reasons.length > 0 ? (
                    elig.reasons.map((r, i) => <li key={i}>{r}</li>)
                  ) : (
                    <li style={{ color: '#10b981', fontWeight: 700 }}>All requirements satisfied! Ready for certification.</li>
                  )}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
