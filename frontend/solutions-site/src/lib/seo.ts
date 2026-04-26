import type { Metadata } from 'next';

/* ─────────────────────────── site config ─────────────────────────── */

export const siteConfig = {
  name: 'HostingOcean Solutions',
  tagline: 'Custom LMS, AI, and Web Development — Built for Modern Businesses.',
  url: 'https://solutions.hostingocean.co.uk',
  description:
    'HostingOcean Solutions is a UK-based software development company specialising in custom LMS platforms, AI chatbots, React applications, Node.js APIs, and automation systems for businesses worldwide.',
  email: 'info@solutions.hostingocean.co.uk',
  twitterHandle: '@hostingocean',
  locale: 'en_GB',
  ogImage: 'https://solutions.hostingocean.co.uk/og-default.png',
} as const;

/* ─────────────────────────── default keywords ─────────────────────────── */

const defaultKeywords: string[] = [
  // Brand
  'HostingOcean Solutions',
  'UK software development company',
  'custom software development UK',
  // LMS
  'LMS development',
  'custom LMS platform',
  'learning management system development',
  'Moodle development',
  'e-learning platform UK',
  // AI
  'AI chatbot development',
  'RAG chatbot',
  'AI assistant development',
  'OpenAI integration',
  'custom AI solutions UK',
  // React
  'React development',
  'Next.js development',
  'React dashboard development',
  'frontend development UK',
  // Node.js / API
  'Node.js API development',
  'REST API development UK',
  'backend development UK',
  'API integration',
  // Automation
  'business process automation',
  'workflow automation UK',
  'automation and integrations',
  'API integrations UK',
  'CRM integration',
  // General
  'web application development UK',
  'bespoke web development',
  'software agency UK',
];

/* ─────────────────────────── default metadata ─────────────────────────── */

/**
 * Full default Metadata object for the root layout.
 * Used directly in `app/layout.tsx` as the site-wide fallback.
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Custom LMS, AI Chatbots, React & Node.js Development`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

/* ─────────────────────────── per-page helper ─────────────────────────── */

/**
 * Builds per-page Metadata, merging page-specific values with site defaults.
 *
 * @param title      - Page title (shown as "<title> | HostingOcean Solutions")
 * @param description - Page-specific meta description (falls back to site default)
 * @param path       - URL path, e.g. '/lms-development' (used for canonical + OG URL)
 * @param keywords   - Additional page-specific keywords merged with the global set
 * @param ogImage    - Optional custom OG image URL for this page
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  ogImage,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: fullTitle,
    description: desc,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: fullTitle,
      description: desc,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  };
}
