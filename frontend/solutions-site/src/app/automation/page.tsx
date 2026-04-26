import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Automation & Integrations',
  description:
    'Business process automation, API integrations, and workflow systems. Connect your tools and eliminate manual work.',
  path: '/automation',
  keywords: ['business automation', 'API integration', 'workflow automation', 'process automation UK', 'Zapier alternative'],
});

export default function AutomationPage() {
  return (
    <ServicePageLayout
      hero={{
        badge: 'Automation & Integrations',
        title: 'Automate Your',
        titleAccent: 'Business Processes',
        subtitle:
          'We connect your systems, eliminate repetitive manual work, and build intelligent workflows that run automatically — so your team can focus on what matters.',
      }}
      overview="From simple webhook integrations between two SaaS tools to complex event-driven automation architectures, we design and build systems that make your business run more efficiently. We start with a process audit to understand where time is being lost, then design and implement automation that actually sticks — not brittle no-code flows that break when a vendor updates their API."
      features={[
        {
          title: 'Business Process Automation',
          description:
            'Audit, redesign, and automate your manual workflows — approvals, notifications, data syncs, report generation, and more.',
        },
        {
          title: 'API Integrations',
          description:
            'Connect any two systems via REST, GraphQL, or webhooks — CRM, ERP, accounting, HR, e-commerce, and beyond.',
        },
        {
          title: 'CRM & ERP Connectors',
          description:
            'Custom integrations with Salesforce, HubSpot, Pipedrive, SAP, and other enterprise platforms.',
        },
        {
          title: 'Workflow Orchestration',
          description:
            'Multi-step, conditional workflow engines with retries, error handling, and audit logs — built to be reliable.',
        },
        {
          title: 'Scheduled & Event-Driven Jobs',
          description:
            'Cron-based batch jobs, webhook listeners, and event-driven pipelines that run on schedule or on trigger.',
        },
        {
          title: 'Data Pipelines & ETL',
          description:
            'Extract, transform, and load data between systems — warehouses, CRMs, analytics platforms, and reporting tools.',
        },
        {
          title: 'Notification & Alerting Systems',
          description:
            'Automated email, SMS, Slack, and Teams notifications triggered by business events and thresholds.',
        },
        {
          title: 'Document Generation',
          description:
            'Automated generation of PDFs, invoices, contracts, and reports from templates and live data.',
        },
        {
          title: 'Monitoring & Alerting',
          description:
            'Every automation includes health monitoring, failure alerts, and a dashboard showing run history and error logs.',
        },
      ]}
      techStack={[
        'Node.js', 'TypeScript', 'BullMQ', 'RabbitMQ',
        'AWS SQS / Lambda', 'PostgreSQL', 'Redis',
        'REST / GraphQL', 'Webhooks', 'n8n',
        'Stripe', 'SendGrid', 'Twilio', 'Slack API',
        'HubSpot', 'Salesforce', 'Docker', 'Terraform',
      ]}
      cta={{
        title: 'Stop doing things manually',
        subtitle:
          "Tell us which processes are eating your team's time. We'll identify the highest-impact automation opportunities and deliver a solution with measurable ROI.",
      }}
    />
  );
}
