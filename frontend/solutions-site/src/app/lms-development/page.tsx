import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'LMS Development',
  description:
    'Custom learning management systems built with React, Node.js, and Moodle. Multi-tenant, white-label, SCORM-compliant LMS platforms for education and enterprise.',
  path: '/lms-development',
  keywords: ['LMS development', 'Moodle customisation', 'custom LMS', 'multi-tenant LMS', 'white-label LMS'],
});

export default function LmsDevelopmentPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'LMS Development',
        title: 'Custom Learning Management',
        titleAccent: 'Systems',
        subtitle:
          'We build bespoke LMS platforms for schools, universities, corporate training teams, and e-learning businesses — from Moodle customisation to fully custom React + Node.js builds.',
      }}
      overview="Whether you need a white-label Moodle platform, a custom multi-tenant LMS, or a fully bespoke learning application built from scratch, we have delivered it. Our LMS projects span SCORM-compliant corporate training portals, government-funded education platforms, and AI-enhanced learning tools. Every system is built for scalability, compliance, and the learner experience."
      features={[
        {
          title: 'React Frontend',
          description:
            'A modern, responsive React or Next.js frontend tailored to your brand — fast, accessible, and optimised for learners on any device.',
        },
        {
          title: 'Node.js Backend',
          description:
            'A scalable Node.js API handling user management, enrolments, progress tracking, content delivery, and integrations.',
        },
        {
          title: 'Moodle Customisation',
          description:
            'Full Moodle theme development, plugin creation, API integrations, and performance tuning for existing Moodle installations.',
        },
        {
          title: 'Multi-Tenant Architecture',
          description:
            'A single platform that powers many clients — each with their own isolated data, domain, branding, and user base.',
        },
        {
          title: 'White-Label LMS',
          description:
            'Fully branded LMS platforms with your logo, colours, domain, and custom feature set — ready to resell or deploy to your organisation.',
        },
        {
          title: 'SCORM / xAPI / LTI 1.3',
          description:
            'Full compliance with e-learning standards — import SCORM packages, track xAPI statements, and connect via LTI 1.3.',
        },
        {
          title: 'SSO & LDAP Integration',
          description:
            'Connect to your existing identity provider — SAML 2.0, OAuth 2.0, LDAP, or Active Directory.',
        },
        {
          title: 'Analytics & Reporting',
          description:
            'Custom dashboards showing learner progress, completion rates, assessment scores, and engagement metrics.',
        },
        {
          title: 'GDPR Compliance',
          description:
            'Built-in data export, right-to-erasure workflows, consent management, and UK/EU data residency options.',
        },
      ]}
      techStack={[
        'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
        'PostgreSQL', 'MongoDB', 'Redis', 'Moodle', 'PHP',
        'SCORM', 'xAPI', 'LTI 1.3', 'AWS', 'Docker',
        'TailwindCSS', 'SAML 2.0', 'OAuth 2.0',
      ]}
      cta={{
        title: 'Ready to build your LMS?',
        subtitle:
          "Tell us about your project. We'll come back with a detailed proposal — including architecture, timeline, and pricing — within one business day.",
      }}
    />
  );
}
