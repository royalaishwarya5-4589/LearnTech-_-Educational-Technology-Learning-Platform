'use client';

import React from 'react';

interface ProgressSyncIndicatorProps {
  isSyncing: boolean;
  syncSource: 'cloud' | 'local' | 'failed' | 'offline';
}

export function ProgressSyncIndicator({ isSyncing, syncSource }: ProgressSyncIndicatorProps) {
  if (isSyncing) {
    return (
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-warning, #f59e0b)' }} />
        Saving...
      </div>
    );
  }

  if (syncSource === 'cloud') {
    return (
      <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
        Saved to Cloud
      </div>
    );
  }

  if (syncSource === 'failed') {
    return (
      <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
        Sync Failed — Saved Locally
      </div>
    );
  }

  return (
    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--border-color)' }} />
      Saved Locally (Guest)
    </div>
  );
}

