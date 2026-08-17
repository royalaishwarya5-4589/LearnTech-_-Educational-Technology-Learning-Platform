'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Path, Lesson } from '@/types/content';
import { LessonProgress } from '@/types/user';
import { useAuth } from '@/components/Auth/AuthProvider';
import { calculatePathProgress } from '@/lib/progressUtils';
import { fetchPathProgress } from '@/app/actions/progress';

import { CertificatePreviewSection } from '@/components/Certificate/CertificatePreviewSection';

interface PythonPathClientProps {
  path: Path;
}

const LOCAL_STORAGE_KEY = 'learntech_guest_progress';

export function PythonPathClient({ path }: PythonPathClientProps) {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPathProgress() {
      setIsLoading(true);
      let newMap: Record<string, LessonProgress> = {};

      if (user) {
        // Single batch fetch for all user progress records in this path
        newMap = await fetchPathProgress(path.slug);
      } else {
        // Load guest progress from localStorage
        try {
          const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as Record<string, LessonProgress>;
            Object.values(parsed).forEach((rec) => {
              if (rec.path_slug === path.slug) {
                newMap[rec.lesson_slug] = rec;
              }
            });
          }
        } catch {
          // Ignore error
        }
      }

      if (isMounted) {
        setProgressMap(newMap);
        setIsLoading(false);
      }
    }

    loadPathProgress();

    return () => {
      isMounted = false;
    };
  }, [user, path]);

  const pathStats = calculatePathProgress(path, progressMap);

  const levelBadges: Record<string, { label: string; variant: 'active' | 'level' | 'success' | 'warning' | 'roadmap' }> = {
    beginner: { label: 'Level 1: Beginner', variant: 'active' },
    intermediate: { label: 'Level 2: Intermediate', variant: 'level' },
    advanced: { label: 'Level 3: Advanced', variant: 'warning' },
    projects: { label: 'Level 4: Projects', variant: 'success' },
    interview: { label: 'Level 5: Mastery', variant: 'roadmap' },
  };

  return (
    <div className="site-container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      {/* Path Header */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{path.icon}</span>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge variant="active">Active V1 Path</Badge>
              <Badge variant="level">Programming Languages</Badge>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--text-main)' }}>
              {path.title}
            </h1>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {path.description}
        </p>

        {/* Overall Real Progress Bar Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Path Progress
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {pathStats.completedLessons} / {pathStats.totalLessons} lessons completed ({pathStats.percentage}%)
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '5px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pathStats.percentage}%`,
                backgroundColor: pathStats.percentage === 100 ? '#10b981' : 'var(--accent-primary)',
                borderRadius: '5px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Next Recommended Lesson Button */}
          {pathStats.nextLesson && !pathStats.nextLesson.isPathCompleted ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
                  NEXT RECOMMENDED LESSON ({pathStats.nextLesson.moduleTitle}):
                </span>
                <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                  {pathStats.nextLesson.lessonTitle}
                </strong>
              </div>
              <Link href={`/paths/${path.slug}/lessons/${pathStats.nextLesson.lessonSlug}`} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">
                  Continue Learning →
                </Button>
              </Link>
            </div>
          ) : (
            <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>
              🎉 Congratulations! You have completed all lessons in Python Programming Mastery!
            </div>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Completion</span>
            <strong style={{ fontSize: '1.1rem' }}>~{path.estimatedHours} Hours</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Structured Modules</span>
            <strong style={{ fontSize: '1.1rem' }}>{path.modules.length} Core Levels</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Interactive Lessons</span>
            <strong style={{ fontSize: '1.1rem' }}>{pathStats.totalLessons} Lessons</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Required Projects</span>
            <strong style={{ fontSize: '1.1rem' }}>{path.totalProjects} Portfolio Apps</strong>
          </div>
        </div>
      </div>

      {/* Certificate Preview Section */}
      <CertificatePreviewSection
        courseName={path.title}
        courseSlug={path.slug}
        level="Level 1–3 | Professional Learning Path"
        skills={
          path.certificationRequirement?.skillsCovered || [
            'Python Programming',
            'Problem Solving',
            'Object-Oriented Programming',
            'Software Development',
            'Production Engineering',
          ]
        }
      />

      {/* Projects Section (Phase 10) */}
      {path.projects && path.projects.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <div className="section-header">
            <span className="section-tag">Portfolio Applications</span>
            <h2 className="section-title">Python Projects & Capstones</h2>
            <p className="section-subtitle">
              Build production-grade applications to apply your learning and build your software portfolio.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {path.projects.map((proj, pIdx) => (
              <Card key={proj.id} hoverable style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Badge variant={levelBadges[proj.difficulty]?.variant || 'active'} size="sm">
                      PROJECT {pIdx + 1}: {proj.difficulty.toUpperCase()}
                    </Badge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      ⏱️ ~{proj.estimatedHours} hrs
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {proj.subtitle}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {proj.skillsLearned.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="level" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/paths/${path.slug}/projects/${proj.slug}`} style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm" style={{ width: '100%' }}>
                    View Project Details & Milestones →
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Level Roadmap Overview */}
      <div className="section-header">
        <span className="section-tag">Syllabus & Roadmap</span>
        <h2 className="section-title">Python Learning Progression</h2>
        <p className="section-subtitle">
          Explore the exact module breakdown and lesson sequence across all mastery levels.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {path.modules.map((mod, modIdx) => {
          const modStat = pathStats.moduleStats[modIdx];
          const isModComplete = modStat && modStat.percentage === 100;
          const isModStarted = modStat && modStat.completedLessons > 0;

          return (
            <Card key={mod.id} hoverable={false} style={{ padding: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge variant={levelBadges[mod.level]?.variant || 'level'}>
                      {levelBadges[mod.level]?.label || mod.level}
                    </Badge>
                    {isModComplete ? (
                      <Badge variant="success" size="sm">✓ Completed</Badge>
                    ) : isModStarted ? (
                      <Badge variant="active" size="sm">▶ In Progress</Badge>
                    ) : (
                      <Badge variant="roadmap" size="sm">○ Not Started</Badge>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {mod.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                    {mod.description}
                  </p>
                </div>

                {/* Per Module Progress Badge & Bar */}
                {modStat && (
                  <div style={{ textAlign: 'right', minWidth: '160px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {modStat.completedLessons} / {modStat.totalLessons} complete ({modStat.percentage}%)
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'var(--bg-app)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginTop: '0.4rem',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${modStat.percentage}%`,
                          backgroundColor: modStat.percentage === 100 ? '#10b981' : 'var(--accent-primary)',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  marginTop: '1.25rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                {mod.lessons.map((lesson: Lesson) => {
                  const lesProgress = progressMap[lesson.slug];
                  const isDone = lesProgress?.status === 'completed';

                  return (
                    <div
                      key={lesson.id}
                      style={{
                        backgroundColor: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-app)',
                        border: isDone ? '1px solid #10b981' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: 700, color: isDone ? '#10b981' : 'var(--accent-primary)', fontSize: '0.9rem' }}>
                            {isDone ? '✅' : `Lesson ${lesson.orderIndex}:`}
                          </span>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            {lesson.title}
                          </h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          {lesson.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          ⏱️ {lesson.estimatedMinutes} mins
                        </span>
                        {lesson.exercise && (
                          <Badge variant="success" size="sm">
                            💻 Code Exercise
                          </Badge>
                        )}
                        {lesson.quiz && (
                          <Badge variant="active" size="sm">
                            ❓ Quiz
                          </Badge>
                        )}
                        <Link href={`/paths/python/lessons/${lesson.slug}`} style={{ textDecoration: 'none' }}>
                          <Button variant={isDone ? 'outline' : 'primary'} size="sm">
                            {isDone ? 'Review Lesson' : 'Start Lesson →'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
