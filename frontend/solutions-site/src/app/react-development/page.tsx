import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'React Development',
  description:
    'Custom React and Next.js development — dashboards, admin portals, customer-facing applications, and UI component libraries.',
  path: '/react-development',
  keywords: ['React development', 'Next.js development', 'React dashboard', 'custom UI', 'TypeScript React'],
});

export default function ReactDevelopmentPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'React Development',
        title: 'Modern React &',
        titleAccent: 'Next.js Applications',
        subtitle:
          'We build high-performance React applications — from customer portals and SaaS frontends to complex internal dashboards and data-rich admin systems.',
      }}
      overview="Our React development practice covers everything from single-page applications to full-stack Next.js platforms. We specialise in data-dense dashboards, multi-role admin panels, customer-facing portals, and custom design systems. Every application is built with TypeScript, tested thoroughly, and optimised for production performance."
      features={[
        {
          title: 'Customer Dashboards',
          description:
            'Beautiful, responsive dashboards with real-time data, charts, filters, and export functionality — built for clarity and speed.',
        },
        {
          title: 'Customer & Partner Portals',
          description:
            'Self-service portals for your customers or partners — onboarding flows, account management, billing, and more.',
        },
        {
          title: 'Admin Panels',
          description:
            'Powerful internal tools for your operations team — user management, content editors, analytics, and audit logs.',
        },
        {
          title: 'Custom UI Component Libraries',
          description:
            'Reusable, accessible, and fully typed React component libraries based on your brand and design system.',
        },
        {
          title: 'Next.js Full-Stack',
          description:
            'Full-stack Next.js applications with App Router, Server Components, API routes, and edge-ready deployments.',
        },
        {
          title: 'TypeScript Throughout',
          description:
            'End-to-end TypeScript for type safety, better developer experience, and fewer runtime bugs in production.',
        },
        {
          title: 'Performance Optimisation',
          description:
            'Core Web Vitals optimisation, lazy loading, code splitting, image optimisation, and CDN-ready builds.',
        },
        {
          title: 'Accessibility (WCAG 2.1)',
          description:
            'All interfaces are built to WCAG 2.1 AA standard — inclusive design for all users.',
        },
        {
          title: 'Testing & QA',
          description:
            'Unit tests, integration tests, and end-to-end tests with Vitest, Testing Library, and Playwright.',
        },
      ]}
      techStack={[
        'React 18', 'Next.js 14', 'TypeScript', 'TailwindCSS',
        'ShadCN UI', 'Zustand', 'React Query', 'Recharts',
        'Framer Motion', 'Vitest', 'Playwright', 'Storybook',
        'Vite', 'Vercel', 'AWS Amplify',
      ]}
      cta={{
        title: 'Let us build your React application',
        subtitle:
          "Share your requirements and we'll come back with a no-obligation proposal — including a technical architecture recommendation, timeline, and fixed-price quote.",
      }}
    />
  );
}
