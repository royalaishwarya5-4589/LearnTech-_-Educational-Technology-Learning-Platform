import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, style, className = '', hoverable = true }: CardProps) {
  const combinedClassName = `${hoverable ? 'card-interactive' : ''} ${className}`.trim();

  return (
    <div
      className={combinedClassName || undefined}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        ...(hoverable ? { cursor: 'pointer' } : {}),
        ...style
      }}
    >
      {children}
    </div>
  );
}
