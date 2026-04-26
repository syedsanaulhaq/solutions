import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Server,
  MessageSquare,
  Workflow,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Example projects from HostingOcean Solutions — LMS platforms, React dashboards, Node.js APIs, AI chatbots, and automation systems delivered for clients across the UK and beyond.',
  path: '/portfolio',
  keywords: [
    'LMS development examples',
    'React dashboard portfolio',
    'Node.js API examples',
    'AI chatbot portfolio',
    'automation examples UK',
    'software development portfolio UK',
  ],
});

/* ─────────────────────────── types ─────────────────────────── */

interface Project {
  title: string;
  industry: string;
  description: string;
  outcomes: string[];
  stack: string[];
  href?: string;
}

/* ─────────────────────────── data ─────────────────────────── */

const categories: {
  id: string;
  label: string;
  icon: React.ReactNode;
  colour: string;
  pillColour: string;
  serviceHref: string;
  projects: Project[];
}[] = [
  {
    id: 'lms',
    label: 'LMS Development',
    icon: <GraduationCap className="h-5 w-5" />,
    colour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    pillColour: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    serviceHref: '/lms-development',
    projects: [
      {
        title: 'Corporate Compliance Training Platform',
        industry: 'Financial Services · UK',
        description:
          'A custom-built compliance LMS for a regulated financial services firm with 1,200 employees. Required SCORM 1.2 support, automated deadline tracking, manager dashboards, and audit-ready completion reports for FCA compliance.',
        outcomes: [
          'Reduced compliance admin from 3 days/month to under 2 hours',
          '98% on-time completion rate achieved within the first quarter',
          'Fully integrated with existing Active Directory for SSO',
        ],
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'SCORM 1.2', 'SAML SSO', 'AWS'],
      },
      {
        title: 'Professional Certification Body LMS',
        industry: 'Professional Qualifications · UK',
        description:
          'End-to-end learning and assessment platform for a professional certification body. Learners progress through structured pathways, complete proctored assessments, and receive digitally signed certificates on achievement.',
        outcomes: [
          'Replaced legacy desktop software with a fully browser-based platform',
          'Automated certificate issuance, reducing turnaround from 5 days to instant',
          '4,000+ active learners onboarded in the first three months',
        ],
        stack: ['React', 'Express', 'MySQL', 'xAPI', 'Stripe', 'PDF generation'],
      },
      {
        title: 'Moodle Platform for Training Provider',
        industry: 'Vocational Training · UK',
        description:
          'A heavily customised Moodle installation for a national training provider delivering apprenticeship programmes. Custom theme, bespoke reporting plugin, and integration with their CRM for enrolment automation.',
        outcomes: [
          'Custom reporting plugin saving 8 hours/week of manual data exports',
          'Automated enrolment from CRM reduced admin overhead by 60%',
          'Launched on schedule across 12 training centres',
        ],
        stack: ['Moodle', 'PHP', 'MySQL', 'HubSpot API', 'Custom plugin development'],
      },
      {
        title: 'Healthcare Staff Training Portal',
        industry: 'Healthcare · Middle East',
        description:
          'A bilingual (English/Arabic) LMS for mandatory staff training across a network of private hospitals. Supports video content, knowledge checks, and mandatory refresh cycles with automated line-manager notifications.',
        outcomes: [
          'Supports 3,500 staff across 7 hospital sites',
          'RTL Arabic interface with full content parity',
          'Mandatory training compliance rate increased to 94%',
        ],
        stack: ['Next.js', 'Node.js', 'PostgreSQL', 'H5P', 'i18n', 'Docker'],
      },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards & Portals',
    icon: <LayoutDashboard className="h-5 w-5" />,
    colour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    pillColour: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    serviceHref: '/react-development',
    projects: [
      {
        title: 'SaaS Operations Dashboard',
        industry: 'SaaS · UK',
        description:
          'A real-time operations dashboard for a B2B SaaS company, surfacing customer health scores, subscription metrics, support ticket volume, and infrastructure status. Used daily by the CEO, CTO, and all department heads.',
        outcomes: [
          'Reduced time-to-insight from weekly reports to real-time visibility',
          'Identified 3 at-risk enterprise accounts in first week of use',
          'Integrated with Stripe, Zendesk, GitHub, and AWS CloudWatch',
        ],
        stack: ['React', 'TypeScript', 'Recharts', 'Node.js', 'Stripe API', 'Zendesk API'],
      },
      {
        title: 'Logistics Fleet Management Portal',
        industry: 'Logistics · UK',
        description:
          'An internal portal for a regional logistics company to manage driver routes, delivery status, vehicle maintenance schedules, and customer notifications. Replaced three separate spreadsheet-based workflows.',
        outcomes: [
          'Eliminated 4 manual spreadsheet processes entirely',
          'Automated customer SMS notifications on delivery status changes',
          'Reduced vehicle downtime by 18% through proactive maintenance tracking',
        ],
        stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Twilio', 'Google Maps API'],
      },
      {
        title: 'Multi-Tenant Client Reporting Portal',
        industry: 'Digital Agency · UK',
        description:
          'A white-label reporting portal for a digital marketing agency to deliver live campaign performance data to each of their clients. Each client sees only their own data with branded views.',
        outcomes: [
          'Replaced manual monthly PDF reports with always-on live dashboards',
          'Reduced reporting preparation time by 90%',
          'Launched across 40 client accounts within two months',
        ],
        stack: ['React', 'Next.js', 'PostgreSQL', 'Google Analytics API', 'Meta Ads API', 'Row-level security'],
      },
    ],
  },
  {
    id: 'api',
    label: 'API & Backend',
    icon: <Server className="h-5 w-5" />,
    colour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    pillColour: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    serviceHref: '/node-api-development',
    projects: [
      {
        title: 'Multi-Vendor Marketplace API',
        industry: 'E-commerce · UK',
        description:
          'The core backend API for a multi-vendor marketplace platform — handling product listings, inventory, orders, payments, vendor payouts, and fulfilment status. Designed from the ground up for horizontal scale.',
        outcomes: [
          'Handles 2,000+ concurrent users without degradation',
          'Stripe Connect integration for automated vendor payouts',
          'Full OpenAPI 3.0 documentation for mobile and third-party consumers',
        ],
        stack: ['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'Redis', 'Stripe Connect', 'Docker'],
      },
      {
        title: 'Property Management Platform API',
        industry: 'PropTech · UK',
        description:
          'A REST API serving a property management SaaS — tenancy creation, rent collection, maintenance requests, contractor assignments, and landlord financial reporting. Multi-tenanted with row-level data isolation.',
        outcomes: [
          'Sub-100ms p95 response times at production load',
          'Automated rent reminder and arrears escalation workflows',
          'ISO 27001-aligned data handling and audit logging',
        ],
        stack: ['Node.js', 'Express', 'PostgreSQL', 'BullMQ', 'SendGrid', 'Twilio', 'AWS RDS'],
      },
      {
        title: 'Healthcare Data Integration API',
        industry: 'HealthTech · UK',
        description:
          'A HL7 FHIR-compatible integration layer connecting a private clinic\'s patient management system, appointment booking platform, and billing software. Ensures consistent patient records across all three systems.',
        outcomes: [
          'Eliminated duplicate patient record creation entirely',
          'Reduced appointment booking errors by 76%',
          'Full audit trail for GDPR and CQC compliance',
        ],
        stack: ['Node.js', 'TypeScript', 'HL7 FHIR', 'PostgreSQL', 'OAuth 2.0', 'Webhook ingestion'],
      },
    ],
  },
  {
    id: 'chatbots',
    label: 'AI Chatbots',
    icon: <MessageSquare className="h-5 w-5" />,
    colour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    pillColour: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    serviceHref: '/ai-chatbots',
    projects: [
      {
        title: 'Legal Services Knowledge-Base Chatbot',
        industry: 'Legal · UK',
        description:
          'A RAG-powered chatbot for a UK law firm, trained on their practice area guides, client FAQs, and service descriptions. Deployed as an embeddable widget on their website to handle initial client enquiries 24/7.',
        outcomes: [
          'Handles 65% of website enquiries without human involvement',
          'Reduced average response time from 4 hours to under 10 seconds',
          'Qualified leads handed to fee earners with full conversation context',
        ],
        stack: ['Node.js', 'OpenAI', 'LangChain', 'Pinecone', 'React widget', 'PDF ingestion'],
      },
      {
        title: 'Internal HR & Policy Assistant',
        industry: 'Retail · UK',
        description:
          'A private AI assistant deployed inside the corporate intranet of a national retailer. Trained on HR policies, employee handbook, IT procedures, and benefits documentation. Accessible only to authenticated employees.',
        outcomes: [
          '1,400 active monthly users within six weeks of launch',
          'HR team reported 40% reduction in routine policy enquiries',
          'Zero data sent to external LLM providers — fully self-hosted inference',
        ],
        stack: ['Next.js', 'LLaMA 3', 'pgvector', 'PostgreSQL', 'SAML SSO', 'Self-hosted'],
      },
      {
        title: 'E-commerce Support & Returns Bot',
        industry: 'E-commerce · UK',
        description:
          'A customer support chatbot integrated with a Shopify store — handling order status, returns initiation, delivery queries, and product questions. Escalates to a human agent in Gorgias when needed.',
        outcomes: [
          'Deflected 58% of support tickets from human agents',
          'Average customer satisfaction score of 4.3/5 for bot interactions',
          'Returns processed 3× faster with automated label generation',
        ],
        stack: ['Node.js', 'OpenAI GPT-4o', 'Shopify API', 'Gorgias API', 'React widget', 'SendGrid'],
      },
    ],
  },
  {
    id: 'automation',
    label: 'Automation & Integrations',
    icon: <Workflow className="h-5 w-5" />,
    colour: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    pillColour: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    serviceHref: '/automation',
    projects: [
      {
        title: 'Invoice & Contract Generation Automation',
        industry: 'Professional Services · UK',
        description:
          'Automated generation of invoices and engagement letters triggered by deal stage changes in HubSpot CRM. Contracts are assembled from templates, populated with CRM data, sent for e-signature, and filed on completion.',
        outcomes: [
          'Eliminated 6 hours/week of manual document preparation',
          'Average contract signature time reduced from 3 days to 4 hours',
          'Zero manual errors in invoice generation since go-live',
        ],
        stack: ['Node.js', 'HubSpot API', 'DocuSign API', 'BullMQ', 'PostgreSQL', 'PDF generation'],
      },
      {
        title: 'Multi-System Order Fulfilment Sync',
        industry: 'Manufacturing · UK',
        description:
          'A real-time integration layer synchronising orders between a Shopify storefront, a legacy ERP system, and a third-party 3PL warehouse. Handles inventory updates, fulfilment status, and returns in both directions.',
        outcomes: [
          'Eliminated daily manual export/import between three systems',
          'Inventory discrepancies reduced from ~40/week to under 2',
          'Same-day despatch rate improved from 71% to 94%',
        ],
        stack: ['Node.js', 'TypeScript', 'Shopify API', 'SAP API', 'RabbitMQ', 'PostgreSQL', 'Docker'],
      },
      {
        title: 'Recruitment Pipeline Automation',
        industry: 'Recruitment · UK',
        description:
          'End-to-end automation of a recruitment agency\'s candidate pipeline — from job board scraping and CV parsing through to interview scheduling, offer letters, and onboarding pack generation.',
        outcomes: [
          'Time-to-first-interview reduced from 5 days to under 24 hours',
          'Automated 14 previously manual steps in the candidate journey',
          'Recruiter capacity effectively doubled without additional headcount',
        ],
        stack: ['Node.js', 'BullMQ', 'OpenAI', 'Calendly API', 'Outlook API', 'PostgreSQL', 'AWS Lambda'],
      },
    ],
  },
];

/* ─────────────────────────── page ─────────────────────────── */

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Portfolio"
        title="Real projects."
        titleAccent="Real results."
        subtitle="A selection of projects we have delivered — LMS platforms, dashboards, APIs, AI chatbots, and automation systems. Client names are withheld by default; full case studies available on request."
        cta1={{ label: 'Discuss Your Project', href: '/contact' }}
        cta2={{ label: 'View Our Services', href: '/services' }}
      />

      {/* ── Intro ── */}
      <Section id="intro">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Projects we are proud to stand behind
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-4">
            Every project shown here was scoped, built, and delivered by our team — no
            subcontracting, no offshore hand-offs. We have kept client names confidential unless
            they have given permission, but the outcomes are real and verifiable.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            If you want to speak with a previous client about their experience, ask us in your
            initial enquiry. We are happy to arrange introductions where appropriate.
          </p>
        </div>
      </Section>

      {/* ── Project categories ── */}
      {categories.map((cat, catIdx) => (
        <Section
          key={cat.id}
          id={cat.id}
          variant={catIdx % 2 === 0 ? 'muted' : 'default'}
        >
          {/* Category header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.colour}`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{cat.label}</h2>
                <p className="text-sm text-muted-foreground">{cat.projects.length} projects</p>
              </div>
            </div>
            <Link href={cat.serviceHref}>
              <Button variant="outline" size="sm" className="gap-2">
                View service <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {cat.projects.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base leading-snug">{project.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${cat.pillColour}`}>
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{project.industry}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Outcomes */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                    Key outcomes
                  </p>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" />
                        <span className="text-muted-foreground leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      {/* ── Confidentiality note ── */}
      <Section id="confidentiality" variant="muted">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-background p-8 text-center shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 mx-auto mb-4">
            <Lock className="h-6 w-6 text-[#2563EB]" />
          </div>
          <h2 className="text-xl font-bold mb-3">Client confidentiality as standard</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We do not publish client names, screenshots, or commercially sensitive details without
            explicit permission. If you would like more detail on any project — including technical
            architecture, team structure, or a direct reference from the client — mention it in
            your enquiry and we will be happy to share what we can.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All projects above represent real delivered work. Outcomes are verified figures
            provided by the client at project sign-off or during ongoing retainer reviews.
          </p>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <ArrowRight className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want results like these?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project. We will scope it properly, propose the right architecture,
            and give you a fixed price before you commit to anything.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free proposal · No commitment · Typically within one business day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
