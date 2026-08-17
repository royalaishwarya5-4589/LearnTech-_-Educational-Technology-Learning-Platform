'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LearnerAnalyticsReport } from '@/types/user';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

interface ProgressReportClientProps {
  report: LearnerAnalyticsReport;
}

export function ProgressReportClient({ report }: ProgressReportClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'assessments' | 'projects' | 'achievements' | 'certifications'>('overview');

  return (
    <div className="site-container" style={{ padding: '2rem 1rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span className="section-tag">Platform Analytics</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
          Detailed Progress & Performance Report
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
          Comprehensive real-time statistics derived from your stored lesson progress, project milestones, assessment performance, and earned certificates.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Progress Report Sections"
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
        }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'courses', label: `Course Breakdown (${report.courses.length})` },
          { id: 'assessments', label: `Assessments (${report.uniqueAssessmentsAttempted})` },
          { id: 'projects', label: `Projects (${report.totalProjectsCompleted})` },
          { id: 'achievements', label: 'Achievements' },
          { id: 'certifications', label: `Certifications (${report.certificatesEarnedCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
          {/* Key Stat Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Overall Mastery</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
                {report.overallMasteryPercentage}%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Platform Average</div>
            </Card>

            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Lessons Completed</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-secondary)', marginTop: '0.25rem' }}>
                {report.totalLessonsCompleted}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Across all courses</div>
            </Card>

            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Exercises Solved</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '0.25rem' }}>
                {report.totalExercisesCompleted}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Interactive challenges</div>
            </Card>

            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Projects Built</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-warning)', marginTop: '0.25rem' }}>
                {report.totalProjectsCompleted}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Portfolio deliverables</div>
            </Card>

            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Assessment Avg</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
                {report.averageAssessmentScore !== null ? `${report.averageAssessmentScore}%` : '—'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {report.totalAssessmentAttempts} total attempt{report.totalAssessmentAttempts === 1 ? '' : 's'}
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Certificates Earned</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--accent-secondary)', marginTop: '0.25rem' }}>
                {report.certificatesEarnedCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Verified credentials</div>
            </Card>
          </div>

          {/* Quick Active Courses Status */}
          <Card style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Active Learning Paths Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {report.courses.map((course) => (
                <div
                  key={course.pathSlug}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: '1 1 250px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Link
                        href={`/paths/${course.pathSlug}`}
                        style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1rem' }}
                      >
                        {course.title}
                      </Link>
                      {course.readinessState === 'development' && (
                        <Badge variant="roadmap" size="sm">Dev</Badge>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {course.completedLessons} / {course.totalLessons} lessons • {course.completedProjects} / {course.requiredProjects} projects
                    </div>
                  </div>

                  <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, backgroundColor: 'var(--bg-muted)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${course.progressPercentage}%`,
                          backgroundColor: 'var(--accent-primary)',
                          height: '100%',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', width: '45px', textAlign: 'right' }}>
                      {course.progressPercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Course Breakdown Tab */}
      {activeTab === 'courses' && (
        <div id="panel-courses" role="tabpanel" aria-labelledby="tab-courses">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {report.courses.map((course) => (
              <Card key={course.pathSlug} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.title}</h3>
                    {course.readinessState === 'development' ? (
                      <Badge variant="roadmap" size="sm">Dev</Badge>
                    ) : (
                      <Badge variant="active" size="sm">Ready</Badge>
                    )}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                      <span>Course Progress</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{course.progressPercentage}%</span>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-muted)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progressPercentage}%`, backgroundColor: 'var(--accent-primary)', height: '100%' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    <div>Lessons: <strong style={{ color: 'var(--text-main)' }}>{course.completedLessons}/{course.totalLessons}</strong></div>
                    <div>Exercises: <strong style={{ color: 'var(--text-main)' }}>{course.completedExercises}/{course.totalExercises}</strong></div>
                    <div>Projects: <strong style={{ color: 'var(--text-main)' }}>{course.completedProjects}/{course.requiredProjects}</strong></div>
                    <div>Mastery: <strong style={{ color: 'var(--text-main)' }}>{course.masteryPercentage}%</strong></div>
                  </div>

                  {/* Certification status */}
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Certification: </span>
                    {course.certificationStatus === 'in_development' && (
                      <strong style={{ color: 'var(--accent-warning)' }}>In Development</strong>
                    )}
                    {course.certificationStatus === 'issued' && (
                      <strong style={{ color: 'var(--accent-secondary)' }}>Certificate Issued ✓</strong>
                    )}
                    {course.certificationStatus === 'eligible' && (
                      <strong style={{ color: 'var(--accent-primary)' }}>Eligible for Certificate</strong>
                    )}
                    {course.certificationStatus === 'not_eligible' && (
                      <strong style={{ color: 'var(--text-muted)' }}>Requirements Pending</strong>
                    )}
                  </div>
                </div>

                <Link href={`/paths/${course.pathSlug}`}>
                  <Button variant="secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
                    View Course Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Assessments Tab */}
      {activeTab === 'assessments' && (
        <div id="panel-assessments" role="tabpanel" aria-labelledby="tab-assessments">
          {report.assessments.length === 0 ? (
            <Card style={{ padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                No Assessment Attempts Recorded
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Attempt end-of-course knowledge assessments to test your skills and earn verified certificates.
              </p>
              <Link href="/paths/python">
                <Button variant="primary">Explore Python Course</Button>
              </Link>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {report.assessments.map((assess) => (
                <Card key={assess.assessmentId} style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>{assess.assessmentTitle}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Course: {assess.pathTitle}</div>
                    </div>
                    <Badge variant={assess.passedCount > 0 ? 'active' : 'roadmap'}>
                      {assess.passedCount > 0 ? 'Passed' : 'In Progress'}
                    </Badge>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Attempts</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{assess.totalAttempts}</div>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Best Score</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{assess.bestScore}%</div>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latest Score</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>{assess.latestScore}%</div>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Score</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{assess.averageScore}%</div>
                    </div>
                  </div>

                  {/* History table */}
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Attempt History</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '0.5rem' }}>Attempt #</th>
                          <th style={{ padding: '0.5rem' }}>Date</th>
                          <th style={{ padding: '0.5rem' }}>Score</th>
                          <th style={{ padding: '0.5rem' }}>Duration</th>
                          <th style={{ padding: '0.5rem' }}>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assess.history.map((item, idx) => (
                          <tr key={item.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '0.5rem', fontWeight: 600 }}>#{item.attempt_number || idx + 1}</td>
                            <td style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>
                              {new Date(item.started_at).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '0.5rem', fontWeight: 700 }}>{item.percentage}%</td>
                            <td style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>
                              {item.duration_seconds ? `${Math.floor(item.duration_seconds / 60)}m ${item.duration_seconds % 60}s` : 'N/A'}
                            </td>
                            <td style={{ padding: '0.5rem' }}>
                              <span style={{ color: item.passed ? 'var(--accent-secondary)' : 'var(--accent-warning)', fontWeight: 600 }}>
                                {item.passed ? 'Passed ✓' : 'Failed'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div id="panel-projects" role="tabpanel" aria-labelledby="tab-projects">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {report.courses.map((course) => (
              <Card key={course.pathSlug} style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {course.title} Projects
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Completed: <strong style={{ color: 'var(--text-main)' }}>{course.completedProjects}</strong> / {course.requiredProjects} required
                </div>

                <div style={{ backgroundColor: 'var(--bg-muted)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: `${course.requiredProjects > 0 ? Math.round((course.completedProjects / course.requiredProjects) * 100) : 0}%`,
                      backgroundColor: 'var(--accent-warning)',
                      height: '100%',
                    }}
                  />
                </div>

                <Link href={`/paths/${course.pathSlug}`}>
                  <Button variant="secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
                    View Project Workbench
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div id="panel-achievements" role="tabpanel" aria-labelledby="tab-achievements">
          <Card style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Platform Milestones & Trophies
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Achievements unlock automatically as you complete lessons, maintain learning streaks, solve exercises, and build portfolio projects.
            </p>
          </Card>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div id="panel-certifications" role="tabpanel" aria-labelledby="tab-certifications">
          {report.courses.filter((c) => c.certificationStatus === 'issued' || c.certificationStatus === 'eligible').length === 0 ? (
            <Card style={{ padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                No Certificates Earned Yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Complete all lessons, portfolio projects, maintain 80%+ mastery, and pass the final assessment to earn your official certificate.
              </p>
              <Link href="/paths/python">
                <Button variant="primary">View Python Certification Requirements</Button>
              </Link>
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {report.courses.map((course) => {
                if (course.certificationStatus === 'in_development') return null;
                return (
                  <Card key={course.pathSlug} style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.title}</h3>
                      <Badge variant={course.certificationStatus === 'issued' ? 'active' : 'roadmap'}>
                        {course.certificationStatus === 'issued' ? 'Issued ✓' : 'Eligible'}
                      </Badge>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Requirements Status:
                      <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                        <li>Lessons: {course.completedLessons}/{course.totalLessons} {course.completedLessons >= course.totalLessons ? '✓' : ''}</li>
                        <li>Projects: {course.completedProjects}/{course.requiredProjects} {course.completedProjects >= course.requiredProjects ? '✓' : ''}</li>
                        <li>Mastery: {course.masteryPercentage}% / 80% {course.masteryPercentage >= 80 ? '✓' : ''}</li>
                        <li>Assessment: {course.bestAssessmentScore !== null ? `${course.bestAssessmentScore}% / 80%` : 'Not Passed'} {course.bestAssessmentScore && course.bestAssessmentScore >= 80 ? '✓' : ''}</li>
                      </ul>
                    </div>

                    <Link href={`/paths/${course.pathSlug}`}>
                      <Button variant={course.certificationStatus === 'eligible' ? 'primary' : 'secondary'} style={{ width: '100%' }}>
                        {course.certificationStatus === 'eligible' ? 'Claim Certificate' : 'Go to Course'}
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
