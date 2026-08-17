'use client';

import React from 'react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        aria-label="Switch to dark theme"
        disabled
        style={{
          background: 'var(--bg-surface-hover)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-main)',
          padding: '0.5rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          transition: 'background 0.2s ease, border-color 0.2s ease',
          opacity: 0.8
        }}
      >
        <span>🌙 Dark</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="btn-interactive"
      style={{
        background: 'var(--bg-surface-hover)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-main)',
        padding: '0.5rem 0.85rem',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
      }}
    >
      <span style={{ transition: 'transform var(--transition-bounce)', display: 'inline-block' }}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </span>
    </button>
  );
}
