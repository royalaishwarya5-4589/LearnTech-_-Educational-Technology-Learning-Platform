'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="site-container" style={{ padding: '5rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <Card hoverable={false} style={{ padding: '3rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Something Went Wrong
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          An unexpected application error occurred. You can try refreshing or returning to the learning path index.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try Again 🔄
          </Button>
          <Link href="/paths" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="md">
              Return to Paths
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
