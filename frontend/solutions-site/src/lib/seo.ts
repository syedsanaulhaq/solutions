import type { Metadata } from 'next';

/* ─────────────────────────── site config ─────────────────────────── */

export const siteConfig = {
  name: 'HostingOcean Solutions',
  tagline: 'Custom LMS, AI, and Web Development — Built for Modern Businesses.',
  url: 'https://solutions.hostingocean.net',
  description:
    'HostingOcean Solutions is a global software development company specialising in custom LMS platforms, AI chatbots, React applications, Node.js APIs, and automation systems for businesses worldwide.',
  email: 'info@solutions.hostingocean.net',
  twitterHandle: '@hostingocean',
  locale: 'en_US',
  ogImage: 'https://solutions.hostingocean.net/opengraph-image',
  address: {
    country: 'PK',
    region: 'Pakistan',
  },
  foundingYear: '2019',
} as const;

/* ─────────────────────────── default keywords ─────────────────────────── */

const defaultKeywords: string[] = [
  // Brand
  'HostingOcean Solutions',
  'global software development company',
  'custom software development',
  // LMS
  'LMS development',
  'custom LMS platform',
  'learning management system development',
  'Moodle development',
  'e-learning platform development',
  // AI
  'AI chatbot development',
  'RAG chatbot',
  'AI assistant development',
  'OpenAI integration',
  'custom AI solutions',
  // React
  'React development',
  'Next.js development',
  'React dashboard development',
  'frontend development',
  // Node.js / API
  'Node.js API development',
  'REST API development',
  'backend development',
  'API integration',
  // Automation
  'business process automation',
  'workflow automation',
  'automation and integrations',
  'API integrations',
  'CRM integration',
  // General
  'web application development',
  'bespoke web development',
  'software agency',
];

/* ─────────────────────── per-page metadata registry ─────────────────────── */

/**
 * Centralized SEO configuration for every page on the site.
 * All title, description, keywords, and OG image data lives here.
 * Pages call buildMetadata() passing their key from this registry.
 */
export const pageMetadata = {
  home: {
    title: 'HostingOcean Solutions',
    description:
      'Global software development company specialising in custom LMS platforms, AI chatbots, React applications, Node.js APIs, and business automation for companies worldwide.',
    keywords: [
      'software development company',
      'custom LMS development',
      'AI chatbot development',
      'React development company',
      'Node.js development',
      'business automation',
      'bespoke software development',
    ],
    path: '/',
    ogImage: '/opengraph-image',
  },
  about: {
    title: 'About Us',
    description:
      'HostingOcean Solutions is a global software development company. Learn about our mission, values, approach, and the senior engineers behind our LMS, AI, and web development work.',
    keywords: [
      'about HostingOcean Solutions',
      'global software development team',
      'custom web development company',
      'software agency',
      'fixed price software development',
      'senior software engineers',
    ],
    path: '/about',
    ogImage: '/og-about.png',
  },
  services: {
    title: 'Services',
    description:
      'Full-service software development — LMS platforms, AI chatbots, React apps, Node.js APIs, automation, DevOps, custom dashboards, and SDK development. Senior engineers, worldwide clients.',
    keywords: [
      'software development services',
      'LMS platform development',
      'AI chatbot service',
      'React development service',
      'Node.js API service',
      'automation service',
      'DevOps service',
      'full-stack development service',
    ],
    path: '/services',
    ogImage: '/og-services.png',
  },
  lmsDevelopment: {
    title: 'LMS Development',
    description:
      'Custom learning management systems built with React, Node.js, and Moodle. Multi-tenant, white-label, SCORM-compliant LMS platforms for education and enterprise.',
    keywords: [
      'custom LMS development',
      'Moodle development',
      'SCORM LMS platform',
      'xAPI learning platform',
      'e-learning development',
      'white-label LMS',
      'multi-tenant LMS',
      'H5P content development',
      'learning management system cost',
      'corporate LMS development',
    ],
    path: '/lms-development',
    ogImage: '/og-lms-development.png',
  },
  aiChatbots: {
    title: 'AI Chatbot Development',
    description:
      'Custom AI chatbots and assistants powered by RAG, OpenAI, and LangChain. Knowledge-base bots, customer support AI, and internal assistants built for growing businesses.',
    keywords: [
      'AI chatbot development',
      'RAG chatbot development',
      'OpenAI chatbot',
      'LangChain development',
      'knowledge base chatbot',
      'customer support AI',
      'internal AI assistant',
      'GPT-4 chatbot development',
      'vector search chatbot',
      'AI assistant',
    ],
    path: '/ai-chatbots',
    ogImage: '/og-ai-chatbots.png',
  },
  reactDevelopment: {
    title: 'React Development',
    description:
      'Production-quality React and Next.js applications. Dashboards, web apps, and component libraries built with TypeScript, TailwindCSS, and modern best practices.',
    keywords: [
      'React development',
      'Next.js development',
      'TypeScript React',
      'React dashboard development',
      'web application development',
      'frontend development company',
      'React component library',
      'SaaS frontend development',
      'React web app',
    ],
    path: '/react-development',
    ogImage: '/og-react-development.png',
  },
  nodeApiDevelopment: {
    title: 'Node.js API Development',
    description:
      'Scalable Node.js REST APIs and backend systems. Authentication, integrations, microservices, and full-stack backends built for production with TypeScript and PostgreSQL.',
    keywords: [
      'Node.js API development',
      'REST API development',
      'Express API development',
      'Fastify API',
      'backend development',
      'API integration',
      'microservices development',
      'Node.js TypeScript',
      'PostgreSQL backend development',
      'API backend',
    ],
    path: '/node-api-development',
    ogImage: '/og-node-api-development.png',
  },
  automation: {
    title: 'Automation & Integrations',
    description:
      'Business process automation and system integrations. Connect your CRM, ERP, LMS, and custom systems with reliable, monitored automation workflows.',
    keywords: [
      'business process automation',
      'workflow automation',
      'CRM integration development',
      'ERP integration',
      'API integration',
      'n8n automation',
      'HubSpot integration',
      'automation development',
      'system integration',
    ],
    path: '/automation',
    ogImage: '/og-automation.png',
  },
  pricing: {
    title: 'Pricing',
    description:
      'Transparent pricing for LMS development, AI chatbots, React applications, Node.js APIs, and automation. Fixed-price quotes, hourly rates, and monthly retainers.',
    keywords: [
      'software development pricing',
      'LMS development cost',
      'AI chatbot pricing',
      'web development rates',
      'fixed price software development',
      'monthly retainer software agency',
      'software development quote',
      'hourly rate software developer',
      'how much does software development cost',
    ],
    path: '/pricing',
    ogImage: '/og-pricing.png',
  },
  portfolio: {
    title: 'Portfolio',
    description:
      'Example projects from HostingOcean Solutions — LMS platforms, React dashboards, Node.js APIs, AI chatbots, and automation systems delivered for clients around the world.',
    keywords: [
      'LMS development examples',
      'React dashboard portfolio',
      'Node.js API case studies',
      'AI chatbot portfolio',
      'automation examples',
      'software development portfolio',
      'software case studies',
    ],
    path: '/portfolio',
    ogImage: '/portfolio/opengraph-image',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with HostingOcean Solutions. Tell us about your project and receive a no-obligation proposal within one business day.',
    keywords: [
      'contact HostingOcean Solutions',
      'software development quote',
      'hire React developer',
      'LMS development enquiry',
      'get a software quote',
      'software project proposal',
    ],
    path: '/contact',
    ogImage: '/og-contact.png',
  },
  blog: {
    title: 'Blog',
    description:
      'Insights on LMS development, AI chatbots, React, Node.js APIs, and business automation from the HostingOcean Solutions engineering team.',
    keywords: [
      'LMS development blog',
      'AI chatbot blog',
      'React development tips',
      'Node.js API blog',
      'software development blog',
      'automation blog',
    ],
    path: '/blog',
    ogImage: '/blog/opengraph-image',
  },
} as const;

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
 * @param title       Page title (shown as "<title> | HostingOcean Solutions")
 * @param description Page-specific meta description (falls back to site default)
 * @param path        URL path, e.g. '/lms-development' (canonical + OG URL)
 * @param keywords    Additional page-specific keywords merged with the global set
 * @param ogImage     Optional custom OG image path, e.g. '/og-lms-development.png'
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
  keywords?: readonly string[];
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path}`;
  // Prefer the provided ogImage; fall back to the dynamic /opengraph-image route.
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

/* ─────────────────────── JSON-LD structured data ─────────────────────── */

/**
 * Organization schema — include once in layout.tsx.
 * Tells search engines who HostingOcean Solutions is.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.address.country,
      addressRegion: siteConfig.address.region,
    },
    foundingDate: siteConfig.foundingYear,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteConfig.email,
      availableLanguage: 'English',
    },
    sameAs: [],
  };
}

/**
 * WebSite schema — include once in layout.tsx.
 * Enables Google Sitelinks search box and site attribution.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList schema for interior pages.
 * @param items  Array of { name, url } in breadcrumb order, starting with Home.
 *
 * @example
 * breadcrumbSchema([
 *   { name: 'Home', url: 'https://solutions.hostingocean.net' },
 *   { name: 'LMS Development', url: 'https://solutions.hostingocean.net/lms-development' },
 * ])
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Service schema for individual service pages.
 * Tells search engines what type of service this page describes.
 */
export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteConfig.url}/contact`,
    },
  };
}
