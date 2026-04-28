'use client';

import { useState, useMemo } from 'react';
import type { PortfolioProject } from '@/lib/portfolio';
import { ProjectCard } from '@/components/ProjectCard';
import { PortfolioFilters } from '@/components/PortfolioFilters';
import { PortfolioSearch } from '@/components/PortfolioSearch';

interface PortfolioListingProps {
  projects: PortfolioProject[];
  categories: readonly string[];
}

export function PortfolioListing({ projects, categories }: PortfolioListingProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, search, activeCategory]);

  const hasFilters = Boolean(search || activeCategory);

  function clearAll() {
    setSearch('');
    setActiveCategory('');
  }

  return (
    <div>
      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <PortfolioSearch value={search} onChange={setSearch} />
        <div className="shrink-0 text-sm text-muted-foreground whitespace-nowrap">
          {filtered.length} of {projects.length} projects
        </div>
      </div>

      {/* ── Category filters ── */}
      <div className="mb-8">
        <PortfolioFilters
          categories={categories}
          projects={projects}
          selected={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background py-20 text-center">
          <p className="text-muted-foreground mb-3">
            No projects match &ldquo;{search || activeCategory}&rdquo;.
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-sm text-[#2563EB] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
