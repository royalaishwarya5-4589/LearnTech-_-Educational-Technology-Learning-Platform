'use client';

import React from 'react';
import { Button } from '@/components/Button';

export default function ProgressError({
  _error,
  reset,
}: {
  _error?: Error & { digest?: string };
  reset: () => void;
}) {
  if (_error) {
    console.error('[Progress Error]:', _error);
  }
  return (
    <div className="site-container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Unable to Load Progress Report
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          An error occurred while compiling your learning statistics. Please try refreshing or reloading the report.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => reset()}>
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
