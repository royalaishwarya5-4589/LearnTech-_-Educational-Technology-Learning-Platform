'use client';

import React from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { useTheme } from '@/components/ThemeContext';

loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

interface MonacoEditorInnerProps {
  value: string;
  onChange: (val: string) => void;
  readOnly?: boolean;
  language?: string;
}

export default function MonacoEditorInner({ value, onChange, readOnly = false, language = 'python' }: MonacoEditorInnerProps) {
  const { theme } = useTheme();

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={(val) => onChange(val || '')}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      options={{
        fontSize: 14,
        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 4,
        readOnly,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        padding: { top: 12, bottom: 12 },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
      }}
    />
  );
}
