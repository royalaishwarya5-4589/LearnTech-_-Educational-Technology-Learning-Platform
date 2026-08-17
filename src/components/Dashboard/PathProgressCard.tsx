'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/types/user';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface PathProgressCardProps {
  pathProgress: DashboardStats['pathProgress'][0];
}

export function PathProgressCard({ pathProgress }: PathProgressCardProps) {
  const { pathSlug, title, totalLessons, completedLessons, percentage, nextLesson } = pathProgress;

  return (
    <Card hoverable={false} style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
            Active Learning Path
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {title}
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {percentage}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {completedLessons} / {totalLessons} lessons completed
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
          marginBottom: '1.25rem',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '5px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Next Recommended Lesson CTA */}
      {nextLesson ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              NEXT UP: {nextLesson.moduleTitle}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {nextLesson.title}
            </div>
          </div>
          <Link href={`/paths/${pathSlug}/lessons/${nextLesson.lessonSlug}`} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              Continue Learning →
            </Button>
          </Link>
        </div>
      ) : (
        <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>
          🎉 Congratulations! You have completed all lessons in this path!
        </div>
      )}
    </Card>
  );
}
