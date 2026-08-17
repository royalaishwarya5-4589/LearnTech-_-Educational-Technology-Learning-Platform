'use client';

import React from 'react';
import Link from 'next/link';
import { RecentActivityItem } from '@/types/user';
import { Card } from '@/components/Card';
import { formatRelativeTime } from '@/lib/progressUtils';

interface RecentActivityListProps {
  activity: RecentActivityItem[];
}

export function RecentActivityList({ activity }: RecentActivityListProps) {
  if (!activity || activity.length === 0) {
    return (
      <Card hoverable={false} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Recent Activity
        </h3>
        <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p style={{ marginBottom: '0.75rem' }}>Start your Python journey! No learning activity recorded yet.</p>
          <Link
            href="/paths/python"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Start Learning →
          </Link>
        </div>
      </Card>
    );
  }

  const getActivityIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'lesson_completed':
        return '🎉';
      case 'exercise_passed':
        return '⚡';
      case 'exercise_attempted':
        return '💻';
      case 'quiz_completed':
        return '❓';
      case 'project_completed':
        return '🛠️';
      case 'project_milestone':
        return '📋';
      default:
        return '✓';
    }
  };

  return (
    <Card hoverable={false} style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
        Recent Activity Timeline
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {activity.map((item) => {
          const itemUrl = item.projectSlug
            ? `/paths/${item.pathSlug}/projects/${item.projectSlug}`
            : `/paths/${item.pathSlug}/lessons/${item.lessonSlug || ''}`;
          const linkLabel = item.projectSlug ? 'View Project →' : 'View Lesson →';

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{getActivityIcon(item.type)}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {formatRelativeTime(item.timestamp)}
                </span>
                <Link
                  href={itemUrl}
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                  }}
                >
                  {linkLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
