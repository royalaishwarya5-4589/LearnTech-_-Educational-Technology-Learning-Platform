'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Path } from '@/types/content';
import { CertificationEligibility, Certificate } from '@/types/user';
import { issueCertificate } from '@/app/actions/certificates';
import { CertificateModal } from './CertificateModal';
import { CertificatePreviewModal } from './CertificatePreviewModal';

interface CertificationRequirementsProps {
  path: Path;
  eligibility?: CertificationEligibility;
  existingCertificate?: Certificate | null;
}

export function CertificationRequirements({ path, eligibility, existingCertificate }: CertificationRequirementsProps) {
  const [cert, setCert] = useState<Certificate | null>(existingCertificate || null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const req = path.certificationRequirement;
  const isDevelopment = req?.certificationStatus === 'development';
  const isEligible = eligibility?.eligible ?? false;

  async function handleClaimCertificate() {
    setIsIssuing(true);
    setErrorMessage(null);

    const res = await issueCertificate(path.slug);
    if (res.success && res.certificate) {
      setCert(res.certificate);
      setShowModal(true);
    } else {
      setErrorMessage(res.error || 'Failed to issue certificate.');
    }
    setIsIssuing(false);
  }

  const skillsCovered = req?.skillsCovered || path.projects?.flatMap((p) => p.skillsLearned) || [];

  if (isDevelopment) {
    return (
      <Card style={{ padding: '2rem', marginBottom: '3rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🚧</span>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Course Certification — In Development
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Curriculum & Examination Expansion in Progress
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Button variant="outline" size="sm" onClick={() => setShowPreviewModal(true)}>
              📜 Preview Certificate
            </Button>
            <Badge variant="warning">
              CERTIFICATION IN DEVELOPMENT
            </Badge>
          </div>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', borderLeft: '4px solid #f59e0b' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {req?.developmentReason ||
              'This course is currently being expanded. Professional certification requirements will become available when the required curriculum depth, labs, and final examinations are complete.'}
          </p>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          💡 You can still complete all existing lessons, coding exercises, and portfolio projects for this course to build skills.
        </div>

        {showPreviewModal && (
          <CertificatePreviewModal
            courseName={path.title}
            courseSlug={path.slug}
            skills={skillsCovered}
            onClose={() => setShowPreviewModal(false)}
          />
        )}
      </Card>
    );
  }

  return (
    <Card style={{ padding: '2rem', marginBottom: '3rem', border: cert ? '2px solid #10b981' : isEligible ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🎓</span>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Course Certification
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {req?.certificateType === 'mastery' ? 'Mastery Level Certification' : 'Certificate of Completion'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Button variant="outline" size="sm" onClick={() => setShowPreviewModal(true)}>
            📜 Preview Certificate
          </Button>
          <Badge variant={cert ? 'success' : isEligible ? 'active' : 'roadmap'}>
            {cert ? 'CERTIFIED GRADUATE' : isEligible ? 'ELIGIBLE' : 'IN PROGRESS'}
          </Badge>
        </div>
      </div>

      {/* Requirement Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>LESSON COMPLETION</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: (eligibility?.lessonsCompletedCount ?? 0) >= (eligibility?.totalLessonsCount ?? 1) ? '#10b981' : 'var(--text-main)' }}>
            {eligibility?.lessonsCompletedCount || 0} / {eligibility?.totalLessonsCount || path.totalLessons}
          </span>
        </div>

        {path.projects && path.projects.length > 0 && (
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>PORTFOLIO PROJECTS</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: (eligibility?.projectsCompletedCount ?? 0) >= (eligibility?.totalProjectsCount ?? 1) ? '#10b981' : 'var(--text-main)' }}>
              {eligibility?.projectsCompletedCount || 0} / {eligibility?.totalProjectsCount || path.totalProjects}
            </span>
          </div>
        )}

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>FINAL ASSESSMENT</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: eligibility?.assessmentPassed ? '#10b981' : 'var(--text-main)' }}>
            {eligibility?.assessmentPassed ? 'Passed' : 'Pending'}
          </span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>MASTERY SCORE</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            {eligibility?.scorePercentage || 0}%
          </span>
        </div>
      </div>

      {/* Missing Requirements / Claim Button */}
      {cert ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, display: 'block' }}>
              ✓ Certificate Issued: {cert.certificate_id}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Issued on {new Date(cert.issued_at).toLocaleDateString()}
            </span>
          </div>

          <Button onClick={() => setShowModal(true)} variant="primary" size="sm">
            View Certificate 📜
          </Button>
        </div>
      ) : isEligible ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700 }}>
            🎉 You have satisfied all certification requirements for {path.title}!
          </span>
          <Button onClick={handleClaimCertificate} variant="primary" disabled={isIssuing}>
            {isIssuing ? 'Generating Certificate...' : 'Get Your Certificate 🎓'}
          </Button>
        </div>
      ) : (
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Missing Requirements for Certification:
          </span>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#ef4444' }}>
            {eligibility?.reasons && eligibility.reasons.length > 0 ? (
              eligibility.reasons.map((r, idx) => <li key={idx}>{r}</li>)
            ) : (
              <li>Complete course lessons, portfolio projects, and final assessment.</li>
            )}
          </ul>
        </div>
      )}

      {errorMessage && (
        <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 700 }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {showModal && cert && (
        <CertificateModal certificate={cert} onClose={() => setShowModal(false)} />
      )}

      {showPreviewModal && (
        <CertificatePreviewModal
          courseName={path.title}
          courseSlug={path.slug}
          skills={skillsCovered}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </Card>
  );
}
