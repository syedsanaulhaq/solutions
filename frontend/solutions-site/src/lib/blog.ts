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
  });
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}