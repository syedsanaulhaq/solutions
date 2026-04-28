'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Clock, Calendar, Star } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogListingProps {
  posts: BlogPost[];
  categories: string[];
}

const PAGE_SIZE = 6;

const CATEGORY_COLOURS: Record<string, string> = {
  'LMS Development': 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800',
  'AI Chatbots': 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
  'Project Management': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  Automation: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  'React Development': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  'Node.js': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(1);

  function handleFilter(newCategory: string) {
    setActiveCategory(newCategory);
    setPage(1);
  }

  function handleSearch(q: string) {
    setSearch(q);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = Boolean(search || activeCategory);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleFilter('')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
            !activeCategory
              ? 'bg-[#2563EB] text-white border-[#2563EB]'
              : 'border-border text-muted-foreground hover:border-[#2563EB]/40 hover:text-foreground'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
              activeCategory === cat
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'border-border text-muted-foreground hover:border-[#2563EB]/40 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={() => { setSearch(''); setActiveCategory(''); setPage(1); }}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} article{filtered.length !== 1 ? 's' : ''}
        {hasFilters ? ' found' : ' total'}
      </p>

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground rounded-xl border border-border">
          No articles match your current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paged.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-background border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[#2563EB]/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                    CATEGORY_COLOURS[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {post.category}
                </span>
                {post.featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] group-hover:gap-2.5 transition-all">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
          >
            ← Prev
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-[#2563EB] text-white'
                  : 'border border-border hover:bg-muted text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="px-4 py-2 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
