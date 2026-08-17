'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Badge } from './Badge';
import { UserMenu } from './Auth/UserMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 88%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background-color var(--transition-smooth), border-color var(--transition-smooth)'
      }}
    >
      <div
        className="site-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}
      >
        <Link
          href="/"
          className="btn-interactive"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontWeight: 800,
            fontSize: '1.25rem'
          }}
        >
          <span
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#FFF',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem'
            }}
          >
            EdTech
          </span>
          <span>LearnTech</span>
          <Badge variant="active" size="sm">
            Stage 3
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link
            href="/paths"
            style={{
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color var(--transition-fast), opacity var(--transition-fast)'
            }}
          >
            Courses
          </Link>
          <Link
            href="/dashboard"
            style={{
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color var(--transition-fast), opacity var(--transition-fast)'
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/progress"
            style={{
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color var(--transition-fast), opacity var(--transition-fast)'
            }}
          >
            Progress Report
          </Link>
          <ThemeToggle />
          <UserMenu />
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div style={{ display: 'none' }} className="mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="btn-interactive"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1.2rem',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'pageFadeIn 200ms ease-out forwards'
          }}
        >
          <Link
            href="/paths"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem' }}
          >
            Courses
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem' }}
          >
            Dashboard
          </Link>
          <Link
            href="/progress"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem' }}
          >
            Progress Report
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
            <ThemeToggle />
            <UserMenu />
          </div>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
