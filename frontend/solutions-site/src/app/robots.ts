import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

/**
 * Generates /robots.txt.
 * Allows all crawlers on all paths except internal API routes.
 * Points crawlers to the auto-generated sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
