'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signInWithEmail } from '@/app/actions/auth';
import { Button } from '@/components/Button';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    /*
     * IMPORTANT:
     * Do NOT wrap this in try/catch.
     *
     * signInWithEmail() uses Next.js redirect('/dashboard')
     * after successful authentication.
     *
     * redirect() throws an internal Next.js redirect signal.
     * A try/catch here would catch that signal and incorrectly
     * display a login error even though authentication succeeded.
     */
    const result = await signInWithEmail(formData);

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '2rem 1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '0.5rem',
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
          }}
        >
          Sign in to access your persistent progress and learner dashboard.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--accent-danger, #ef4444)',
              color: 'var(--accent-danger, #ef4444)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '0.35rem',
              }}
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '0.35rem',
              }}
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '0.5rem',
              width: '100%',
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          Don&apos;t have an account yet?{' '}
          <Link
            href="/signup"
            style={{
              color: 'var(--accent-primary)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
