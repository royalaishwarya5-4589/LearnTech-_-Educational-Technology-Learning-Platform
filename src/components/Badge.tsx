import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'roadmap' | 'level' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'active', size = 'md' }: BadgeProps) {
  let bg = 'var(--badge-active-bg)';
  let color = 'var(--badge-active-text)';

  if (variant === 'roadmap') {
    bg = 'var(--badge-roadmap-bg)';
    color = 'var(--badge-roadmap-text)';
  } else if (variant === 'level') {
    bg = 'var(--bg-muted)';
    color = 'var(--text-main)';
  } else if (variant === 'success') {
    bg = 'rgba(16, 185, 129, 0.15)';
    color = 'var(--accent-secondary)';
  } else if (variant === 'warning') {
    bg = 'rgba(217, 119, 6, 0.15)';
    color = 'var(--accent-warning)';
  }

  const padding = size === 'sm' ? '0.2rem 0.5rem' : '0.35rem 0.75rem';
  const fontSize = size === 'sm' ? '0.75rem' : '0.85rem';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        fontSize,
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        backgroundColor: bg,
        color: color,
        lineHeight: 1,
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </span>
  );
}
