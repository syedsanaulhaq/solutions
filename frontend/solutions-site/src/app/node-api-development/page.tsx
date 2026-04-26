import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Node.js API Development',
  description:
    'Scalable Node.js REST APIs, authentication systems, microservices, and third-party integrations built for production.',
  path: '/node-api-development',
  keywords: ['Node.js API', 'REST API development', 'Node.js microservices', 'Express API', 'backend development UK'],
});

export default function NodeApiDevelopmentPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'Node.js API Development',
        title: 'Scalable APIs &',
        titleAccent: 'Backend Systems',
        subtitle:
          'We design and build Node.js APIs that handle real-world traffic — clean architecture, comprehensive auth, and thorough documentation from day one.',
      }}
      overview="From simple REST APIs to complex microservice ecosystems, our Node.js team builds backend systems that are secure, well-documented, and ready to scale. We follow clean architecture principles, use TypeScript throughout, and deliver every API with full OpenAPI documentation, automated tests, and a Postman collection. Every system includes structured logging, rate limiting, and production-hardened security controls."
      features={[
        {
          title: 'REST API Design',
          description:
            'Resource-oriented REST APIs following OpenAPI 3.1 spec — consistent error formats, versioning, and pagination.',
        },
        {
          title: 'GraphQL APIs',
          description:
            'Type-safe GraphQL schemas with resolvers, subscriptions, dataloaders, and automatic introspection docs.',
        },
        {
          title: 'Authentication & Authorisation',
          description:
            'JWT, API keys, OAuth 2.0, SAML 2.0, and RBAC — production-hardened auth from day one.',
        },
        {
          title: 'Third-Party Integrations',
          description:
            'Stripe, SendGrid, Twilio, Slack, HubSpot, Salesforce, and any REST/webhook-based platform.',
        },
        {
          title: 'Microservices Architecture',
          description:
            'Domain-driven microservices with message queues (RabbitMQ / SQS), service discovery, and distributed tracing.',
        },
        {
          title: 'Database Design',
          description:
            'PostgreSQL, MongoDB, and Redis — schema design, query optimisation, migrations, and connection pooling.',
        },
        {
          title: 'Background Jobs',
          description:
            'Cron jobs, event-driven workers, and queue processors using Bull, BullMQ, or AWS SQS.',
        },
        {
          title: 'OpenAPI Documentation',
          description:
            'Machine-readable OpenAPI 3.1 docs and Swagger UI so your frontend team can move fast.',
        },
        {
          title: 'Security & Compliance',
          description:
            'OWASP Top 10 mitigations, rate limiting, input validation, helmet.js, CORS, and SQL injection prevention.',
        },
      ]}
      techStack={[
        'Node.js', 'TypeScript', 'Express', 'Fastify',
        'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ',
        'Prisma', 'Drizzle ORM', 'JWT', 'OAuth 2.0',
        'Docker', 'AWS', 'Terraform', 'Jest',
        'OpenAPI 3.1', 'Swagger UI',
      ]}
      cta={{
        title: 'Need a production-ready API?',
        subtitle:
          "Tell us about your integration requirements, expected load, and timeline. We'll provide a clear technical proposal with pricing within one business day.",
      }}
    />
  );
}
