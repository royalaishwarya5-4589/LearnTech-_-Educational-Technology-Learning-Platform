'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { pythonProjects } from '@/content/projects-data';
import { ProjectProgress } from '@/types/user';

interface ProjectsProgressOverviewProps {
  projectProgressMap: Record<string, ProjectProgress>;
}

export function ProjectsProgressOverview({ projectProgressMap }: ProjectsProgressOverviewProps) {
  const difficultyVariantMap: Record<string, 'active' | 'level' | 'warning' | 'success'> = {
    beginner: 'active',
    intermediate: 'level',
    advanced: 'warning',
    capstone: 'success',
  };

  return (
    <Card hoverable={false} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-purple, #8b5cf6)', fontWeight: 700 }}>
            Portfolio Applications
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Python Projects Status
          </h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {pythonProjects.map((project) => {
          const rec = projectProgressMap[project.slug];
          const percent = rec?.progress_percent || 0;
          const isDone = rec?.status === 'completed';

          return (
            <div
              key={project.id}
              style={{
                backgroundColor: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-app)',
                border: isDone ? '1px solid #10b981' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Badge variant={difficultyVariantMap[project.difficulty] || 'active'} size="sm">
                    {project.difficulty.toUpperCase()}
                  </Badge>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isDone ? '#10b981' : 'var(--text-main)' }}>
                    {percent}%
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {project.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {project.subtitle}
                </p>
              </div>

              <div>
                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '0.75rem',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percent}%`,
                      backgroundColor: isDone ? '#10b981' : 'var(--accent-primary)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>

                <Link href={`/paths/${project.pathSlug}/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                  <Button variant={isDone ? 'outline' : 'primary'} size="sm" style={{ width: '100%' }}>
                    {isDone ? 'Review Project' : percent > 0 ? 'Continue Project →' : 'Start Project →'}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
