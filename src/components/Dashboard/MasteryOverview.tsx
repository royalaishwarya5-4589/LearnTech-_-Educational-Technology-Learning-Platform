'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/types/user';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface MasteryOverviewProps {
  stats: DashboardStats;
}

export function MasteryOverview({ stats }: MasteryOverviewProps) {
  const { mastery, nextRecommendedActivity } = stats;

  return (
    <Card hoverable={false} style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
            Overall Learning Mastery
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Python Mastery Score
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
            {mastery.overallPercentage}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Calculated across all activities
          </div>
        </div>
      </div>

      {/* Main Mastery Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '12px',
          backgroundColor: 'var(--bg-app)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${mastery.overallPercentage}%`,
            backgroundColor: mastery.overallPercentage === 100 ? '#10b981' : 'var(--accent-primary)',
            borderRadius: '6px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Breakdown Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-app)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Lessons</span>
          <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{mastery.lessonsCompleted} / {mastery.totalLessons}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Exercises</span>
          <strong style={{ fontSize: '1.05rem', color: '#10b981' }}>{mastery.exercisesSolved} / {mastery.totalExercises}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Quizzes</span>
          <strong style={{ fontSize: '1.05rem', color: 'var(--accent-warning, #f59e0b)' }}>{mastery.quizzesPassed} / {mastery.totalQuizzes}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Projects</span>
          <strong style={{ fontSize: '1.05rem', color: 'var(--accent-purple, #8b5cf6)' }}>{mastery.projectsCompleted} / {mastery.totalProjects}</strong>
        </div>
      </div>

      {/* Next Recommended Activity CTA Card */}
      {nextRecommendedActivity ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              NEXT RECOMMENDED {nextRecommendedActivity.type.toUpperCase()}:
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {nextRecommendedActivity.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {nextRecommendedActivity.subtitle}
            </div>
          </div>

          <Link href={nextRecommendedActivity.url} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="md">
              Continue Learning →
            </Button>
          </Link>
        </div>
      ) : (
        <div style={{ color: '#10b981', fontWeight: 700, textAlign: 'center', padding: '0.5rem' }}>
          🎉 Congratulations! You have achieved 100% Python Mastery!
        </div>
      )}
    </Card>
  );
}
