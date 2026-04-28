import rawData from '../../data/portfolio.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string;
  description: string;
  outcomes: string[];
  technologies: string[];
  images: string[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const CATEGORIES = [
  'LMS Development',
  'Dashboards & Portals',
  'API & Backend',
  'AI Chatbots',
  'Automation & Integrations',
] as const;

export type Category = (typeof CATEGORIES)[number];

// ---------------------------------------------------------------------------
// Category visual styles — complete Tailwind class strings so the purge
// step includes them in the production CSS bundle.
// ---------------------------------------------------------------------------
export const CATEGORY_STYLES: Record<
  string,
  {
    /** Pill badge — light/dark-adaptive (cards, sidebar) */
    badge: string;
    /** Pill badge — on dark hero backgrounds */
    heroBadge: string;
    /** Thin top strip on project cards */
    cardStrip: string;
    /** Active filter button */
    filterActive: string;
  }
> = {
  'LMS Development': {
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    heroBadge: 'bg-violet-900/40 text-violet-300 border border-violet-700',
    cardStrip: 'bg-violet-600',
    filterActive: 'bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700',
  },
  'Dashboards & Portals': {
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    heroBadge: 'bg-blue-900/40 text-blue-300 border border-blue-700',
    cardStrip: 'bg-blue-600',
    filterActive: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700',
  },
  'API & Backend': {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    heroBadge: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700',
    cardStrip: 'bg-emerald-600',
    filterActive: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700',
  },
  'AI Chatbots': {
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    heroBadge: 'bg-amber-900/40 text-amber-300 border border-amber-700',
    cardStrip: 'bg-amber-500',
    filterActive: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700',
  },
  'Automation & Integrations': {
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    heroBadge: 'bg-rose-900/40 text-rose-300 border border-rose-700',
    cardStrip: 'bg-rose-600',
    filterActive: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getAllProjects(): PortfolioProject[] {
  return rawData as PortfolioProject[];
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return (rawData as PortfolioProject[]).find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  return (rawData as PortfolioProject[]).filter((p) => p.category === category);
}

export function formatProjectDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
