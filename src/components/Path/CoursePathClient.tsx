'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Path, Module, Lesson } from '@/types/content';
import { LessonProgress } from '@/types/user';
import { useAuth } from '@/components/Auth/AuthProvider';
import { calculatePathProgress } from '@/lib/progressUtils';
import { fetchPathProgress } from '@/app/actions/progress';
import { CertificationRequirements } from '@/components/Certificate/CertificationRequirements';
import { CertificatePreviewSection } from '@/components/Certificate/CertificatePreviewSection';
import { isEligibleForCertification } from '@/lib/assessmentEngine';

interface CoursePathClientProps {
  path: Path;
}

const LOCAL_STORAGE_KEY = 'learntech_guest_progress';

export function CoursePathClient({ path }: CoursePathClientProps) {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress>>({});
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPathProgress() {
      setIsLoading(true);
      let newMap: Record<string, LessonProgress> = {};

      if (user) {
        newMap = await fetchPathProgress(path.slug);
      } else {
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
          // Ignore
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
  const eligibility = isEligibleForCertification(path, progressMap);

  const totalExercises = path.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => Boolean(l.exercise)).length,
    0
  );
  const totalProjects = path.projects ? path.projects.length : 0;
  const finalAssessment = path.assessments && path.assessments.length > 0 ? path.assessments[0] : null;

  // Group modules by Level
  const level1Modules = path.modules.filter(
    (m) => m.level === 'foundations' || m.level === 'absolute_beginner' || m.level === 'beginner' || m.orderIndex === 1
  );
  const level2Modules = path.modules.filter(
    (m) => (m.level === 'intermediate' || m.orderIndex === 2) && !level1Modules.includes(m)
  );
  const level3Modules = path.modules.filter(
    (m) => !level1Modules.includes(m) && !level2Modules.includes(m)
  );

  return (
    <div className="site-container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      {/* 1. Hero Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '3rem' }}>{path.icon}</span>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
              <Badge variant="active">{path.categoryLabel}</Badge>
              <Badge variant="level">Difficulty: {(path.difficulty || 'Intermediate').toUpperCase()}</Badge>
              {path.certificationRequirement?.certificationStatus === 'ready' ? (
                <Badge variant="success">🎓 Certification Ready</Badge>
              ) : (
                <Badge variant="roadmap">🧪 Lab Course</Badge>
              )}
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2 }}>
              {path.title}
            </h1>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '850px', lineHeight: 1.6, marginBottom: '2rem' }}>
          {path.description}
        </p>

        {/* 2. Key Metrics Stats Grid (20 Elements Required Info) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>ESTIMATED TIME</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>⏱️ ~{path.estimatedHours} Hours</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>TOTAL LESSONS</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>📚 {path.totalLessons} Lessons</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>EXERCISES</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>⚡ {totalExercises} Practice Exercises</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>PORTFOLIO PROJECTS</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>🚀 {totalProjects} Projects</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>FINAL ASSESSMENT</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>🎯 {finalAssessment ? 'Available' : 'Included'}</span>
          </div>
        </div>

        {/* 3. Real Progress Tracker & Action CTA */}
        <div
          style={{
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Learner Path Progression
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              {pathStats.completedLessons} / {pathStats.totalLessons} Lessons ({pathStats.percentage}%)
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '12px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${pathStats.percentage}%`,
                backgroundColor: pathStats.percentage === 100 ? '#10b981' : 'var(--accent-primary)',
                borderRadius: '6px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {pathStats.nextLesson && !pathStats.nextLesson.isPathCompleted ? (
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                  NEXT LESSON
                </span>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {pathStats.nextLesson.lessonTitle}
                </span>
              </div>
            ) : (
              <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 700 }}>
                🎉 You have completed all lessons in this path!
              </div>
            )}

            <Button
              href={
                pathStats.nextLesson && !pathStats.nextLesson.isPathCompleted
                  ? `/paths/${path.slug}/lessons/${pathStats.nextLesson.lessonSlug}`
                  : `/paths/${path.slug}/lessons/${path.modules[0]?.lessons[0]?.slug || ''}`
              }
              variant="primary"
              size="md"
              style={{ fontWeight: 800, padding: '0.75rem 1.75rem' }}
            >
              {pathStats.completedLessons > 0 ? 'Continue Learning →' : 'Start Course Now →'}
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Course Overview & Learning Outcomes Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
            🎯 What You Will Learn & Master
          </h3>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            <li>Master core foundational concepts, syntax conventions, and language runtimes.</li>
            <li>Solve real-world problems with production design patterns and optimized algorithms.</li>
            <li>Build portfolio projects matching real software engineering specifications.</li>
            <li>Identify security vulnerabilities, common pitfalls, and operational anti-patterns.</li>
            <li>Pass comprehensive final assessments validating job-ready technical competence.</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
            📋 Course Prerequisites & Skills Gained
          </h3>
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              PREREQUISITES:
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600 }}>
              {path.difficulty === 'beginner' || path.difficulty === 'mastery'
                ? 'No prior programming background required. Starts from absolute foundations.'
                : 'Basic programming literacy and terminal CLI usage recommended.'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              SKILLS GAINED:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Core Logic', 'Clean Code', 'Debugging', 'Production Practice', 'Problem Solving'].map((skill) => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '15px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                  }}
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Certificate Preview Section */}
      <CertificatePreviewSection
        courseName={path.title}
        courseSlug={path.slug}
        level="Level 1–3 | Professional Learning Path"
        skills={path.certificationRequirement?.skillsCovered}
      />

      {/* 6. Certification Requirements Widget */}
      <CertificationRequirements path={path} eligibility={eligibility} />

      {/* 6. Complete Learning Journey Visual Curriculum (Level 1 -> Level 2 -> Level 3) */}
      <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Structured Learning Journey</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--text-main)' }}>
            Course Curriculum & Level Progression
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Guided 3-tier progression taking learners from fundamental concepts to core practical engineering and production mastery.
          </p>
        </div>

        {/* Level 1 — Foundations */}
        {level1Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderLeft: '4px solid #3b82f6',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🌱</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 1 — FOUNDATIONS
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Learn absolute fundamentals, core syntax, environment setup, and fundamental logic blocks.
              </p>
            </div>

            <RenderModuleList modules={level1Modules} path={path} progressMap={progressMap} />
          </div>
        )}

        {/* Level 2 — Core Practice */}
        {level2Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderLeft: '4px solid #f59e0b',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🛠️</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 2 — CORE PRACTICE
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Solve realistic problems, master data structures, error handling, design patterns, and mini-projects.
              </p>
            </div>

            <RenderModuleList modules={level2Modules} path={path} progressMap={progressMap} />
          </div>
        )}

        {/* Level 3 — Advanced & Professional */}
        {level3Modules.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderLeft: '4px solid #10b981',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🚀</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  LEVEL 3 — ADVANCED & PRODUCTION MASTERY
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', margin: 0 }}>
                Apply knowledge to real software architecture, security, optimization, scale, and portfolio capstones.
              </p>
            </div>

            <RenderModuleList modules={level3Modules} path={path} progressMap={progressMap} />
          </div>
        )}
      </div>

      {/* 7. Portfolio Projects Section */}
      {path.projects && path.projects.length > 0 && (
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            🏆 Hands-On Portfolio Projects
          </h2>
          <div className="card-grid">
            {path.projects.map((project) => (
              <Card key={project.id} style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge variant="success">
                    {project.difficulty.toUpperCase()} PROJECT
                  </Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱️ ~{project.estimatedHours}h</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {project.subtitle}
                </p>
                <Button href={`/paths/${path.slug}/projects/${project.slug}`} variant="outline" size="sm" style={{ width: '100%', fontWeight: 700 }}>
                  Open Project Blueprint & Starter Code →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 8. Final Assessment Banner */}
      {finalAssessment && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <Badge variant="active">FINAL CERTIFICATION EVALUATION</Badge>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
              {finalAssessment.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '600px' }}>
              {finalAssessment.description} (Passing Threshold: {finalAssessment.passingScorePercent}%)
            </p>
          </div>

          <Button href={`/paths/${path.slug}/assessments/${finalAssessment.slug}`} variant="primary" size="md" style={{ fontWeight: 800 }}>
            Take Final Assessment →
          </Button>
        </div>
      )}
    </div>
  );
}

function RenderModuleList({
  modules,
  path,
  progressMap,
}: {
  modules: Module[];
  path: Path;
  progressMap: Record<string, LessonProgress>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {modules.map((moduleItem: Module, modIdx: number) => (
        <div
          key={moduleItem.id}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Badge variant="level">Module {modIdx + 1}</Badge>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {moduleItem.title}
              </h4>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {moduleItem.lessons.length} Lessons
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {moduleItem.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {moduleItem.lessons.map((lessonItem: Lesson, lesIdx: number) => {
              const rec = progressMap[lessonItem.slug];
              const isCompleted = rec?.status === 'completed';

              return (
                <div
                  key={lessonItem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-app)',
                    border: isCompleted ? '1px solid #10b981' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem 1.25rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? '#10b981' : 'var(--bg-surface)',
                        color: isCompleted ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        border: isCompleted ? 'none' : '1px solid var(--border-color)',
                      }}
                    >
                      {isCompleted ? '✓' : lesIdx + 1}
                    </span>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link
                          href={`/paths/${path.slug}/lessons/${lessonItem.slug}`}
                          style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}
                        >
                          {lessonItem.title}
                        </Link>
                        {isCompleted && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: '#10b9811f', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                            Completed
                          </span>
                        )}
                        {lessonItem.exercise && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-surface)', color: 'var(--accent-primary)', border: '1px solid var(--border-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                            ⚡ Coding Exercise
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {lessonItem.description} ({lessonItem.estimatedMinutes} mins)
                      </span>
                    </div>
                  </div>

                  <Button href={`/paths/${path.slug}/lessons/${lessonItem.slug}`} variant={isCompleted ? 'outline' : 'primary'} size="sm">
                    {isCompleted ? 'Review' : 'Start Lesson'} →
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

