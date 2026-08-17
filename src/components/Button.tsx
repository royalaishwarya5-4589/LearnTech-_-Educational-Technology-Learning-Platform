import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  target,
  rel,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  let bg = 'var(--accent-primary)';
  let color = 'var(--text-inverse)';
  let border = 'none';

  if (variant === 'secondary') {
    bg = 'var(--bg-muted)';
    color = 'var(--text-main)';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = 'var(--text-main)';
    border = '1px solid var(--border-color)';
  }

  let padding = '0.6rem 1.25rem';
  let fontSize = '0.95rem';

  if (size === 'sm') {
    padding = '0.4rem 0.85rem';
    fontSize = '0.85rem';
  } else if (size === 'lg') {
    padding = '0.85rem 1.75rem';
    fontSize = '1.05rem';
  }

  const combinedClassName = `btn-interactive ${className}`.trim();

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding,
    fontSize,
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    backgroundColor: bg,
    color: color,
    border,
    cursor: 'pointer',
    textDecoration: 'none',
    ...style
  };

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} style={baseStyle} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button style={baseStyle} className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
