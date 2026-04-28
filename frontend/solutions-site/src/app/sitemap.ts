import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { getAllPosts, getUniqueCategories, getUniqueTags } from '@/lib/blog';
import { getAllProjects } from '@/lib/portfolio';

/**
 * Dynamically generates /sitemap.xml — includes all static pages plus
 * dynamic blog, portfolio, category, and tag routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteConfig.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/lms-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/ai-chatbots`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/react-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/node-api-development`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/automation`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteConfig.url}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/pricing-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteConfig.url}/docs`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${siteConfig.url}/get-a-quote`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${siteConfig.url}/solutions/chatbot`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/solutions/lms-builder`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/solutions/automation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.8 : 0.6,
  }));

  // Blog category pages
  const categoryRoutes: MetadataRoute.Sitemap = getUniqueCategories().map((cat) => ({
    url: `${siteConfig.url}/blog/category/${encodeURIComponent(cat.replace(/ /g, '-'))}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Blog tag pages
  const tagRoutes: MetadataRoute.Sitemap = getUniqueTags().map((tag) => ({
    url: `${siteConfig.url}/blog/tag/${encodeURIComponent(tag.replace(/ /g, '-'))}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  // Portfolio projects
  const portfolioRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/portfolio/${project.slug}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...portfolioRoutes,
  ];
}
