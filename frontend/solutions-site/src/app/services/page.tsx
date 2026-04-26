import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { ServiceCard } from '@/components/ServiceCard';
import { Hero } from '@/components/Hero';
import { BookOpen, Code2, Server, Bot, Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore all HostingOcean Solutions services — LMS development, React apps, Node.js APIs, AI chatbots, and automation.',
  alternates: { canonical: 'https://solutions.hostingocean.co.uk/services' },
};

const services = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'LMS Development',
    description:
      'End-to-end learning management systems — React frontend, Node.js backend, Moodle customisation, multi-tenant and white-label options.',
    features: ['Custom React LMS', 'Moodle customisation', 'Multi-tenant', 'White-label', 'SCORM / xAPI'],
    href: '/lms-development',
    badge: 'Popular',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'React Development',
    description:
      'Modern React and Next.js applications — dashboards, portals, admin panels, and custom UI systems built to the highest standard.',
    features: ['React & Next.js', 'Dashboards', 'Admin portals', 'Custom UI', 'TypeScript'],
    href: '/react-development',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: 'Node.js API Development',
    description:
      'Scalable REST APIs, authentication systems, and microservices built with Node.js for production workloads.',
    features: ['REST & GraphQL', 'Auth systems', 'Integrations', 'Microservices', 'OpenAPI docs'],
    href: '/node-api-development',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'AI Chatbot Development',
    description:
      'Intelligent chatbots powered by GPT-4o, Claude, and Gemini — RAG systems, support bots, and embeddable widgets.',
    features: ['RAG pipelines', 'Support bots', 'Knowledge-base Q&A', 'Widget embeds', 'Multi-model'],
    href: '/ai-chatbots',
    badge: 'New',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Automation & Integrations',
    description:
      'Business automation, API integrations, and workflow systems that reduce manual work and connect your tools.',
    features: ['Process automation', 'API integrations', 'CRM / ERP', 'Workflow engines', 'Scheduled jobs'],
    href: '/automation',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        badge="All Services"
        title="What We Build"
        titleAccent="For You"
        subtitle="Five specialised service lines covering every aspect of modern software development — delivered by a UK-registered team."
      />
      <Section
        title="Our Services"
        subtitle="Choose a service below to learn more about what we deliver, our process, and the technologies we use."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.href} {...service} />
          ))}
        </div>
      </Section>
    </>
  );
}
