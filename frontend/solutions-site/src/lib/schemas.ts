/**
 * JSON-LD schema generators for SEO structured data.
 * Usage: pass the returned object into a <script type="application/ld+json"> tag.
 */

import { siteConfig } from './seo';

// ---------------------------------------------------------------------------
// Article schema (blog posts)
// ---------------------------------------------------------------------------
export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      '@type': 'Organization',
      name: input.author ?? siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icons/icon-192.png`,
      },
    },
    image: input.image
      ? {
          '@type': 'ImageObject',
          url: input.image.startsWith('http')
            ? input.image
            : `${siteConfig.url}${input.image}`,
        }
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb schema
// ---------------------------------------------------------------------------
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http')
        ? item.href
        : `${siteConfig.url}${item.href}`,
    })),
  };
}

// ---------------------------------------------------------------------------
// FAQ schema (service pages)
// ---------------------------------------------------------------------------
export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// HowTo schema (docs / tutorials)
// ---------------------------------------------------------------------------
export interface HowToStep {
  name: string;
  text: string;
}

export function howToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
