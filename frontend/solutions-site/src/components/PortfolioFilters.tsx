'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { PortfolioProject } from '@/lib/portfolio';
import { CATEGORY_STYLES } from '@/lib/portfolio';

interface PortfolioFiltersProps {
  categories: readonly string[];
  projects: PortfolioProject[];
  selected: string;
  onChange: (category: string) => void;
}

export function PortfolioFilters({
  categories,
  projects,
  selected,
  onChange,
}: PortfolioFiltersProps) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of projects) {
      map[p.category] = (map[p.category] ?? 0) + 1;
    }
    return map;
  }, [projects]);

  const btnBase =
    'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-sm font-medium transition-colors cursor-pointer whitespace-nowrap';
  const btnInactive =
    'border-border text-muted-foreground bg-background hover:bg-muted hover:text-foreground';
  const btnAllActive =
    'border-[#2563EB]/40 bg-[#2563EB]/10 text-[#2563EB]';

  return (
    <div className="flex flex-wrap gap-2">
      {/* All button */}
      <button
        onClick={() => onChange('')}
        className={cn(btnBase, selected === '' ? btnAllActive : btnInactive)}
      >
        All projects
        <span className="text-xs opacity-70">({projects.length})</span>
      </button>

      {/* Per-category buttons */}
      {categories.map((cat) => {
        const isActive = selected === cat;
        const styles = CATEGORY_STYLES[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              btnBase,
              isActive
                ? styles?.filterActive ?? btnAllActive
                : btnInactive,
            )}
          >
            {cat}
            <span className="text-xs opacity-70">({counts[cat] ?? 0})</span>
          </button>
        );
      })}
    </div>
  );
}
