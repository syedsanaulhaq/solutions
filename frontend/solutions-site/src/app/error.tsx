'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[PageError]', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          An unexpected error occurred on this page. Please try again, or contact us at{' '}
          <a href="mailto:info@hostingocean.net" className="text-blue-500 hover:underline">
            info@hostingocean.net
          </a>
          .
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2 border border-border rounded-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
