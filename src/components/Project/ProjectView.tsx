'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project, Path } from '@/types/content';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { ProgressSyncIndicator } from '@/components/Workbench/ProgressSyncIndicator';
import { CodeEditor } from '@/components/Editor/CodeEditor';

interface ProjectViewProps {
  path: Path;
  project: Project;
  projectIndex: number;
  totalProjects: number;
}

export function ProjectView({ path, project, projectIndex, totalProjects }: ProjectViewProps) {
  const { projectProgress, isSyncing, syncSource, toggleMilestone, completeAllMilestones } = useProjectProgress(
    path.slug,
    project
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'code'>('overview');
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const difficultyVariantMap: Record<Project['difficulty'], 'active' | 'level' | 'warning' | 'success'> = {
    beginner: 'active',
    intermediate: 'level',
    advanced: 'warning',
    capstone: 'success',
  };

  const isCompleted = projectProgress.status === 'completed';

  return (
    <div className="site-container" style={{ padding: '2.5rem 1.5rem 5rem 1.5rem' }}>
      {/* Top Breadcrumb Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
          <Link href={`/paths/${path.slug}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            🐍 {path.title}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            Project {projectIndex} of {totalProjects}
          </span>
        </div>

        <ProgressSyncIndicator isSyncing={isSyncing} syncSource={syncSource} />
      </div>

      {/* Hero Banner Card */}
      <Card hoverable={false} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant={difficultyVariantMap[project.difficulty] || 'active'}>
                {project.difficulty.toUpperCase()} PROJECT
              </Badge>
              {isCompleted ? (
                <Badge variant="success">COMPLETED ✅</Badge>
              ) : projectProgress.status === 'in_progress' ? (
                <Badge variant="active">IN PROGRESS ▶</Badge>
              ) : (
                <Badge variant="roadmap">NOT STARTED ○</Badge>
              )}
            </div>

            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0 0.5rem 0' }}>
              {project.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6 }}>
              {project.subtitle}
            </p>
          </div>

          <div style={{ textAlign: 'right', minWidth: '180px' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isCompleted ? '#10b981' : 'var(--accent-primary)' }}>
              {projectProgress.progress_percent}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {projectProgress.completed_milestones.length} of {project.milestones.length} milestones complete
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: '5px',
            overflow: 'hidden',
            margin: '1.5rem 0 1.25rem 0',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${projectProgress.progress_percent}%`,
              backgroundColor: isCompleted ? '#10b981' : 'var(--accent-primary)',
              borderRadius: '5px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            size="md"
            onClick={() => setActiveTab('milestones')}
          >
            {isCompleted ? 'Review Milestones' : projectProgress.status === 'in_progress' ? 'Continue Project →' : 'Start Project →'}
          </Button>

          {!isCompleted && projectProgress.completed_milestones.length > 0 && (
            <Button variant="secondary" size="md" onClick={completeAllMilestones}>
              Mark Project as Fully Complete 🎉
            </Button>
          )}

          <Link href={`/paths/${path.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="md">
              ← Back to Path
            </Button>
          </Link>
        </div>
      </Card>

      {/* Tabs Header */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '1.5rem',
        }}
      >
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '0.65rem 1rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'overview' ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'overview' ? 700 : 500,
            borderBottom: activeTab === 'overview' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          📄 Overview & Instructions
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          style={{
            padding: '0.65rem 1rem',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'milestones' ? 'var(--accent-primary)' : 'var(--text-muted)',
            fontWeight: activeTab === 'milestones' ? 700 : 500,
            borderBottom: activeTab === 'milestones' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          📋 Milestones & Requirements ({projectProgress.completed_milestones.length}/{project.milestones.length})
        </button>

        {project.starterCode && (
          <button
            onClick={() => setActiveTab('code')}
            style={{
              padding: '0.65rem 1rem',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'code' ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontWeight: activeTab === 'code' ? 700 : 500,
              borderBottom: activeTab === 'code' ? '2px solid var(--accent-primary)' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            💻 Starter Code Template
          </button>
        )}
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1.5rem' }}>
          <Card hoverable={false} style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Project Description
            </h3>
            <p style={{ color: 'var(--text-main)', lineHeight: 1.7, fontSize: '0.95rem', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>
              {project.description}
            </p>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Learning Objectives
            </h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {project.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>

            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Technical Requirements & Specifications
            </h4>
            <div style={{ color: 'var(--text-main)', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
              {project.projectInstructionsMarkdown}
            </div>
          </Card>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Card hoverable={false} style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Project Metadata
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Estimated Time</span>
                  <strong>⏱️ ~{project.estimatedHours} Hours</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Difficulty</span>
                  <strong style={{ textTransform: 'capitalize' }}>📊 {project.difficulty}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Milestone Count</span>
                  <strong>📋 {project.milestones.length} Milestones</strong>
                </div>
              </div>
            </Card>

            <Card hoverable={false} style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Skills Demonstrated
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.skillsLearned.map((skill, idx) => (
                  <Badge key={idx} variant="level" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card hoverable={false} style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Prerequisites
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {project.prerequisites.map((pre, idx) => (
                  <li key={idx}>{pre}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: MILESTONES */}
      {activeTab === 'milestones' && (
        <Card hoverable={false} style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Project Milestone Checklist
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Check off milestones as you complete them in your local code environment.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {project.milestones.map((m) => {
              const isDone = projectProgress.completed_milestones.includes(m.id);

              return (
                <div
                  key={m.id}
                  style={{
                    backgroundColor: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-app)',
                    border: isDone ? '1px solid #10b981' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleMilestone(m.id)}
                      id={`milestone-${m.id}`}
                      style={{
                        width: '1.2rem',
                        height: '1.2rem',
                        marginTop: '0.2rem',
                        cursor: 'pointer',
                        accentColor: '#10b981',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor={`milestone-${m.id}`}
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          cursor: 'pointer',
                          textDecoration: isDone ? 'line-through' : 'none',
                          opacity: isDone ? 0.8 : 1,
                        }}
                      >
                        {m.title}
                      </label>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                        {m.description}
                      </p>

                      {m.hints && m.hints.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <button
                            onClick={() => toggleHint(m.id)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'var(--accent-primary)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              padding: 0,
                            }}
                          >
                            {openHints[m.id] ? 'Hide Hint 🙈' : 'View Implementation Hint 💡'}
                          </button>
                          {openHints[m.id] && (
                            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                              {m.hints.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Tab 3: STARTER CODE TEMPLATE */}
      {activeTab === 'code' && project.starterCode && (
        <Card hoverable={false} style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Starter Code Template
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Use this starter code in your local Python environment or code editor to begin building.
          </p>

          <div style={{ height: '400px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <CodeEditor value={project.starterCode} readOnly />
          </div>
        </Card>
      )}
    </div>
  );
}
