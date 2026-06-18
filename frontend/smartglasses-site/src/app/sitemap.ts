import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { categories } from '@/data/categories';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/cart`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...categories.map((c) => ({
      url: `${site.url}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
