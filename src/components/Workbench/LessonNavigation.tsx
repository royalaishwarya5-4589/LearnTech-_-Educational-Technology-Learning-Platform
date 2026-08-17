'use client';

import React from 'react';
import Link from 'next/link';
import { Lesson, Path, Module } from '@/types/content';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

interface LessonNavigationProps {
  path: Path;
  module: Module;
  lesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  lessonIndex: number;
  totalLessons: number;
}

export function LessonNavigation({
  path,
  module,
  lesson,
  prevLesson,
  nextLesson,
  lessonIndex,
  totalLessons,
}: LessonNavigationProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.25rem',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: Path Breadcrumb & Current Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link
          href={`/paths/${path.slug}`}
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <span>← {path.title}</span>
        </Link>

        <span style={{ color: 'var(--border-color)' }}>|</span>

        <Badge variant="level" size="sm">
          {module.title}
        </Badge>

        <h1 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
          {lessonIndex}. {lesson.title}
        </h1>
      </div>

      {/* Right: Lesson Counter & Prev/Next Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Lesson {lessonIndex} of {totalLessons}
        </span>

        {prevLesson ? (
          <Link href={`/paths/${path.slug}/lessons/${prevLesson.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm">
              ← Previous
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            ← Previous
          </Button>
        )}

        {nextLesson ? (
          <Link href={`/paths/${path.slug}/lessons/${nextLesson.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              Next Lesson →
            </Button>
          </Link>
        ) : (
          <Link href={`/paths/${path.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              Finish Module 🎉
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
