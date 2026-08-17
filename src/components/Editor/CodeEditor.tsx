'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MonacoEditorInner = dynamic(
  () => import('./MonacoEditorInner'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.9rem',
          fontFamily: 'monospace',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        Loading Monaco Code Editor...
      </div>
    ),
  }
);

interface CodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  language?: string;
}

export function CodeEditor({ value, onChange, readOnly, language }: CodeEditorProps) {
  return (
    <div style={{ height: '100%', width: '100%', minHeight: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <MonacoEditorInner value={value} onChange={onChange || (() => {})} readOnly={readOnly} language={language} />
    </div>
  );
}
