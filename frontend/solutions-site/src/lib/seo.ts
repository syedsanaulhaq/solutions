import type { Metadata } from 'next';

const siteConfig = {
  name: 'HostingOcean Solutions',
  tagline: 'Custom LMS, AI, and Web Development — Built for Modern Businesses.',
  url: 'https://solutions.hostingocean.co.uk',
  description:
    'HostingOcean Solutions is a UK-based software development company specialising in custom LMS platforms, AI chatbots, React applications, and Node.js APIs for businesses worldwide.',
  twitterHandle: '@hostingocean',
};

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    keywords: [
      'software development UK',
      'LMS development',
      'React development',
      'Node.js API development',
      'AI chatbot development',
      'custom web development',
      ...keywords,
    ],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description: desc,
      siteName: siteConfig.name,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      site: siteConfig.twitterHandle,
    },
    robots: { index: true, follow: true },
  };
}

export { siteConfig };
