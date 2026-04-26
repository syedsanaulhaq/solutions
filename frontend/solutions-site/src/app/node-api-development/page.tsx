import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Server,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
  Plug,
  Layers,
  ShieldCheck,
  FileCode2,
  Zap,
  Database,
  RefreshCw,
  BarChart3,
  AlertCircle,
  GitBranch,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Node.js API Development',
  description:
    'Scalable Node.js REST APIs, authentication systems, microservices, and third-party integrations built for production. OpenAPI documented, TypeScript throughout.',
  path: '/node-api-development',
  keywords: [
    'Node.js API development',
    'REST API development',
    'Node.js microservices',
    'Express API',
    'backend development UK',
    'GraphQL API',
    'authentication API',
  ],
});

/* ─────────────────────────── data ─────────────────────────── */

const apiCapabilities = [
  {
    icon: <Globe className="h-6 w-6" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: 'REST APIs',
    subtitle: 'Resource-oriented APIs designed to be used, not just shipped',
    description:
      'We design REST APIs that are intuitive to integrate with — consistent resource naming, predictable error formats, versioning from day one, and complete OpenAPI 3.1 documentation. Every endpoint is tested, rate-limited, and built to handle real-world edge cases.',
    points: [
      'OpenAPI 3.1 spec and Swagger UI documentation',
      'Consistent error format with error codes and messages',
      'Cursor and offset-based pagination',
      'API versioning strategy (v1, v2) built in from the start',
      'Postman collection and integration test suite',
      'Rate limiting, request validation, and CORS handling',
    ],
  },
  {
    icon: <Lock className="h-6 w-6" />,
    colour: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    title: 'Authentication & Authorisation',
    subtitle: 'Production-hardened auth that covers every case',
    description:
      'Authentication is where APIs most commonly go wrong — insecure tokens, missing refresh flows, no revocation, incomplete RBAC. We build auth systems that cover every case: short-lived JWTs, refresh token rotation, SSO, multi-tenant isolation, and fine-grained permission models.',
    points: [
      'JWT access tokens with short expiry and refresh rotation',
      'OAuth 2.0 — authorization code, client credentials, PKCE flows',
      'SAML 2.0 and OpenID Connect for enterprise SSO',
      'API key management with scopes and per-key rate limits',
      'Role-based access control (RBAC) and attribute-based (ABAC)',
      'Multi-tenant data isolation at the query level',
    ],
  },
  {
    icon: <Plug className="h-6 w-6" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    title: 'Third-Party Integrations',
    subtitle: 'Connect your system to every platform your business depends on',
    description:
      'APIs rarely live in isolation. We build the integration layer that connects your backend to payment processors, CRMs, communication platforms, and data providers — with proper webhook handling, retry logic, and error recovery so integrations stay reliable under real conditions.',
    points: [
      'Payment gateways — Stripe, GoCardless, PayPal',
      'CRM platforms — HubSpot, Salesforce, Pipedrive',
      'Communication — SendGrid, Mailgun, Twilio, Slack',
      'Webhook ingestion with signature verification and retry queues',
      'OAuth 2.0 integrations to any third-party platform',
      'Data sync pipelines with conflict resolution',
    ],
  },
  {
    icon: <Layers className="h-6 w-6" />,
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    title: 'Microservices Architecture',
    subtitle: 'Distributed systems built to scale independently',
    description:
      'When a monolith starts to crack under load or team size, a well-designed microservices architecture solves real problems. We design service boundaries around business domains, implement async communication via message queues, and add the observability layer that makes distributed systems debuggable.',
    points: [
      'Domain-driven service decomposition',
      'Async messaging with RabbitMQ, Kafka, or AWS SQS/SNS',
      'Service-to-service authentication with mutual TLS or API tokens',
      'Distributed tracing with OpenTelemetry',
      'Circuit breakers and graceful degradation',
      'Shared API gateway with routing, auth, and rate limiting',
    ],
  },
];

const techStack = [
  { label: 'Node.js', category: 'Runtime' },
  { label: 'TypeScript', category: 'Runtime' },
  { label: 'Express', category: 'Framework' },
  { label: 'Fastify', category: 'Framework' },
  { label: 'NestJS', category: 'Framework' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'Redis', category: 'Database' },
  { label: 'Prisma', category: 'Database' },
  { label: 'Drizzle ORM', category: 'Database' },
  { label: 'JWT', category: 'Auth' },
  { label: 'OAuth 2.0', category: 'Auth' },
  { label: 'SAML 2.0', category: 'Auth' },
  { label: 'BullMQ', category: 'Queues' },
  { label: 'RabbitMQ', category: 'Queues' },
  { label: 'AWS SQS', category: 'Queues' },
  { label: 'Docker', category: 'Infra' },
  { label: 'OpenAPI 3.1', category: 'Infra' },
];

const categoryColours: Record<string, string> = {
  Runtime: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Framework: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Database: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Auth: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Queues: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Infra: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};

const standards = [
  {
    icon: <FileCode2 className="h-5 w-5 text-[#2563EB]" />,
    title: 'OpenAPI docs as standard',
    description: 'Every API ships with a machine-readable OpenAPI 3.1 spec, Swagger UI, and a Postman collection. No detective work for your frontend team.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />,
    title: 'OWASP Top 10 compliance',
    description: 'Input validation, parameterised queries, helmet.js headers, CORS policy, and rate limiting — security built in, not bolted on.',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#2563EB]" />,
    title: 'Performance from the start',
    description: 'Connection pooling, query optimisation, Redis caching, and async I/O — we profile under realistic load before every release.',
  },
  {
    icon: <Database className="h-5 w-5 text-[#2563EB]" />,
    title: 'Migrations and seeding',
    description: 'Every schema change ships as a reversible migration. Dev, staging, and production databases stay in sync without manual steps.',
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-[#2563EB]" />,
    title: 'Structured logging',
    description: 'JSON-structured logs with request ID correlation, timing, and error context — ready for Datadog, CloudWatch, or any log aggregator.',
  },
  {
    icon: <AlertCircle className="h-5 w-5 text-[#2563EB]" />,
    title: 'Error handling done right',
    description: 'Global error handler, consistent error schema, operational vs programmer error separation, and never-leak-stack-traces in production.',
  },
  {
    icon: <RefreshCw className="h-5 w-5 text-[#2563EB]" />,
    title: 'Retry and idempotency',
    description: 'Idempotency keys for payment and mutation endpoints, retry-safe webhook handlers, and queue-based job deduplication.',
  },
  {
    icon: <GitBranch className="h-5 w-5 text-[#2563EB]" />,
    title: 'Test suite included',
    description: 'Unit tests for business logic, integration tests against a real test database, and contract tests for third-party integrations.',
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    title: 'Background jobs',
    description: 'Cron jobs, delayed tasks, and event-driven workers via BullMQ — with job progress tracking, retries, and dead-letter queues.',
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function NodeApiDevelopmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Node.js API Development"
        title="APIs Built for Production"
        titleAccent="From Day One"
        subtitle="Scalable Node.js REST APIs, authentication systems, third-party integrations, and microservice backends — TypeScript throughout, OpenAPI documented, security-first."
        cta1={{ label: 'Get a Free Quote', href: '/contact' }}
        cta2={{ label: 'View All Services', href: '/services' }}
      />

      {/* ── Overview ── */}
      <Section id="overview">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Overview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Backend systems that are secure, documented, and built to scale
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Most API problems surface six months after launch — when the authentication
            system cannot handle SSO, the rate limiter does not exist, the docs are
            outdated, and the test coverage is zero. By then, fixing it requires a rewrite
            more disruptive than building it properly in the first place.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We design and build Node.js APIs with the end state in mind. Clean architecture,
            TypeScript throughout, every security control in place before the first endpoint
            ships, OpenAPI docs generated from code, and a test suite that covers the
            critical paths. Whether you need a single integration API or a full microservices
            backend, we deliver it production-ready — not production-adjacent.
          </p>
        </div>
      </Section>

      {/* ── API Capabilities ── */}
      <Section id="capabilities" variant="muted" title="What We Build" subtitle="Four core areas of Node.js backend development — each with depth, not just breadth.">
        <div className="space-y-6">
          {apiCapabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-2xl border border-border/60 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cap.colour}`}>
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{cap.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{cap.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cap.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                        <span className="text-muted-foreground leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Engineering Standards ── */}
      <Section id="standards" title="Our Engineering Standards" subtitle="These practices are not optional on our projects — every API we ship meets this bar.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {standards.map((s) => (
            <div key={s.title} className="flex gap-3.5 p-5 rounded-xl border border-border/50 bg-background shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 mt-0.5">{s.icon}</div>
              <div>
                <h3 className="font-semibold mb-1 text-foreground text-sm">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section id="tech-stack" variant="muted" title="Technologies We Use" subtitle="Battle-tested tools chosen for reliability, ecosystem maturity, and long-term maintainability.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {['Runtime', 'Framework', 'Database', 'Auth', 'Queues', 'Infra'].map((cat) => (
            <div key={cat} className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {cat}
              </span>
              <div className="flex flex-wrap gap-2">
                {techStack
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <span
                      key={t.label}
                      className={`text-sm font-medium px-3 py-1 rounded-full ${categoryColours[cat]}`}
                    >
                      {t.label}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <Server className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a production-ready API?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your integration requirements, expected traffic, authentication
            needs, and timeline. We will come back with a clear technical proposal —
            including architecture diagram, database schema approach, and a fixed-price
            quote — within one business day.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free scoping call · No commitment · UK-based team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

