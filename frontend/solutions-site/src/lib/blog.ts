import type { Metadata } from 'next';
import { buildMetadata } from './seo';
import rawData from '../../data/blog.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  date: string;
  featured: boolean;
}

export function getAllPosts(): BlogPost[] {
  return (rawData as unknown as BlogPost[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return (rawData as unknown as BlogPost[]).find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(slug: string, category: string, limit = 2): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function getUniqueCategories(): string[] {
  const seen = new Set<string>();
  const cats: string[] = [];
  for (const p of rawData as unknown as BlogPost[]) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      cats.push(p.category);
    }
  }
  return cats;
}

export function getUniqueTags(): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const p of rawData as unknown as BlogPost[]) {
    for (const tag of p.tags) {
      if (!seen.has(tag)) {
        seen.add(tag);
        tags.push(tag);
      }
    }
  }
  return tags;
}

export function buildPostMetadata(post: BlogPost): Metadata {
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    ogImage: '/blog/opengraph-image',
  });
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Returns all posts that carry the given tag (case-insensitive). */
export function getPostsByTag(tag: string): BlogPost[] {
  const lower = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === lower),
  );
}

/** Calculates approximate reading time from plain-text content. */
export function calcReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// ---------------------------------------------------------------------------
// Internal linking helpers — map blog categories to relevant site pages
// ---------------------------------------------------------------------------
export const categoryInternalLinks: Record<
  string,
  Array<{ label: string; href: string }>
> = {
  'LMS Development': [
    { label: 'LMS Development Service', href: '/lms-development' },
    { label: 'LMS Portfolio Projects', href: '/portfolio' },
    { label: 'Get an LMS Quote', href: '/get-a-quote' },
  ],
  'AI Chatbots': [
    { label: 'AI Chatbot Development', href: '/ai-chatbots' },
    { label: 'Chatbot SaaS Platform', href: '/solutions/chatbot' },
    { label: 'Get a Chatbot Quote', href: '/get-a-quote' },
  ],
  Automation: [
    { label: 'Automation & Integrations', href: '/automation' },
    { label: 'Automation Solutions', href: '/solutions/automation' },
    { label: 'Get an Automation Quote', href: '/get-a-quote' },
  ],
  'React Development': [
    { label: 'React Development Service', href: '/react-development' },
    { label: 'Project Portfolio', href: '/portfolio' },
    { label: 'Get a React Quote', href: '/get-a-quote' },
  ],
  'Node.js': [
    { label: 'Node.js API Development', href: '/node-api-development' },
    { label: 'API Project Portfolio', href: '/portfolio' },
    { label: 'Get an API Quote', href: '/get-a-quote' },
  ],
  'Project Management': [
    { label: 'Our Delivery Process', href: '/docs/project-delivery-process' },
    { label: 'View Our Work', href: '/portfolio' },
    { label: 'Get a Quote', href: '/get-a-quote' },
  ],
};