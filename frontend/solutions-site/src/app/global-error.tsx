'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for monitoring but don't crash
    if (process.env.NODE_ENV !== 'production') {
      console.error('[GlobalError]', error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, sans-serif',
          background: '#0f172a',
          color: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: '1.6' }}>
            An unexpected error occurred. Our team has been notified. Please try again or
            contact us at{' '}
            <a href="mailto:info@hostingocean.net" style={{ color: '#60a5fa' }}>
              info@hostingocean.net
            </a>
            .
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.6rem 1.4rem',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                padding: '0.6rem 1.4rem',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
