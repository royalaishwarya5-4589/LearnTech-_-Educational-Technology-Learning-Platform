'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/types/user';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface DashboardOverviewProps {
  stats: DashboardStats;
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Welcome Banner */}
      <Card style={{ padding: '1.5rem 1.75rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-hover) 100%)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
              Welcome back to LearnTech!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
              Overall Mastery: <strong style={{ color: 'var(--accent-primary)' }}>{stats.mastery.overallPercentage}%</strong> • Streak: <strong style={{ color: 'var(--accent-warning)' }}>🔥 {stats.currentStreakDays} day{stats.currentStreakDays === 1 ? '' : 's'}</strong>
            </p>
          </div>
          <Link href="/progress">
            <Button variant="primary" style={{ fontSize: '0.9rem' }}>
              View Detailed Analytics Report →
            </Button>
          </Link>
        </div>
      </Card>

      {/* Overview Stat Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}
      >
        <Card hoverable={false} style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
            Lessons Completed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            {stats.totalLessonsCompleted}
          </div>
        </Card>

        <Card hoverable={false} style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
            Exercises Solved
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
            {stats.totalExercisesSolved}
          </div>
        </Card>

        <Card hoverable={false} style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
            Quiz Accuracy
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-warning)' }}>
            {stats.quizAccuracyPercentage}%
          </div>
        </Card>

        <Card hoverable={false} style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
            Projects Completed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-purple)' }}>
            {stats.totalProjectsCompleted || 0}
          </div>
        </Card>

        <Card hoverable={false} style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
            Daily Streak
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            🔥 {stats.currentStreakDays}
          </div>
        </Card>
      </div>
    </div>
  );
}

