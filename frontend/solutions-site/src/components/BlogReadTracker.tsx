'use client';

import { useEffect, useRef } from 'react';
import { trackBlogRead } from '@/lib/analytics';

interface BlogReadTrackerProps {
  slug: string;
  category: string;
}

/**
 * Fires a blog_read analytics event when the user reaches the bottom of the article.
 * Uses IntersectionObserver to avoid triggering on initial render.
 */
export function BlogReadTracker({ slug, category }: BlogReadTrackerProps) {
  const fired = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackBlogRead(slug, category);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug, category]);

  return <div ref={sentinelRef} aria-hidden="true" className="h-px" />;
}
