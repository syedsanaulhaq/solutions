'use client';

import { useState, useMemo } from 'react';
import { Search, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/testimonials';
import { TestimonialCard } from '@/components/TestimonialCard';

interface TestimonialsListingProps {
  testimonials: Testimonial[];
  projects: { slug: string; title: string }[];
  ratings: number[];
}

const PAGE_SIZE = 9;

export function TestimonialsListing({
  testimonials,
  projects,
  ratings,
}: TestimonialsListingProps) {
  const [search, setSearch] = useState('');
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return testimonials.filter((t) => {
      if (activeRating !== null && t.rating !== activeRating) return false;
      if (activeProject && t.projectSlug !== activeProject) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.message.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [testimonials, search, activeRating, activeProject]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(search || activeRating !== null || activeProject);

  function clearAll() {
    setSearch('');
    setActiveRating(null);
    setActiveProject('');
    setPage(1);
  }

  function handleFilter(fn: () => void) {
    fn();
    setPage(1);
  }

  const btnBase = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors cursor-pointer whitespace-nowrap';
  const btnInactive = 'border-border text-muted-foreground bg-background hover:bg-muted hover:text-foreground';
  const btnActive = 'border-amber-300 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700';
  const btnActiveBlue = 'border-[#2563EB]/40 bg-[#2563EB]/10 text-[#2563EB]';

  return (
    <div>
      {/* ── Search + count row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, company or keyword…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); setPage(1); }}
              aria-label="Clear"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
          {filtered.length} of {testimonials.length} reviews
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-sm text-[#2563EB] hover:underline whitespace-nowrap shrink-0"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* ── Rating filter ── */}
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Filter by rating</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilter(() => setActiveRating(null))}
            className={cn(btnBase, activeRating === null ? btnActiveBlue : btnInactive)}
          >
            All ratings <span className="text-xs opacity-70">({testimonials.length})</span>
          </button>
          {ratings.map((r) => {
            const count = testimonials.filter((t) => t.rating === r).length;
            return (
              <button
                key={r}
                onClick={() => handleFilter(() => setActiveRating(r))}
                className={cn(btnBase, activeRating === r ? btnActive : btnInactive)}
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={cn('h-3.5 w-3.5', s <= r ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/30')} />
                  ))}
                </div>
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Project filter ── */}
      {projects.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Filter by project</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilter(() => setActiveProject(''))}
              className={cn(btnBase, activeProject === '' ? btnActiveBlue : btnInactive)}
            >
              All projects
            </button>
            {projects.map((p) => (
              <button
                key={p.slug}
                onClick={() => handleFilter(() => setActiveProject(p.slug))}
                className={cn(btnBase, activeProject === p.slug ? btnActiveBlue : btnInactive)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      {paginated.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background py-20 text-center">
          <p className="text-muted-foreground mb-3">No testimonials match your filters.</p>
          {hasFilters && (
            <button onClick={clearAll} className="text-sm text-[#2563EB] hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors"
          >
            ← Previous
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                'h-9 w-9 rounded-lg border text-sm font-medium transition-colors',
                page === i + 1
                  ? 'border-[#2563EB]/40 bg-[#2563EB]/10 text-[#2563EB]'
                  : 'border-border hover:bg-muted',
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
