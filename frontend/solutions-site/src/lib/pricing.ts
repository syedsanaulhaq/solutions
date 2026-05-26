// ---------------------------------------------------------------------------
// Pricing model config — used by PricingCalculator component
// ---------------------------------------------------------------------------

export const SERVICES = [
  { value: 'lms', label: 'LMS / E-Learning Platform' },
  { value: 'chatbot', label: 'AI Chatbot' },
  { value: 'webapp', label: 'React Web Application' },
  { value: 'api', label: 'Node.js API / Backend' },
  { value: 'automation', label: 'Automation & Integrations' },
] as const;

export type ServiceType = (typeof SERVICES)[number]['value'];

export const COMPLEXITY = [
  { value: 'small', label: 'Small — well-defined scope, few integrations' },
  { value: 'medium', label: 'Medium — moderate complexity, 1–3 integrations' },
  { value: 'large', label: 'Large — complex scope, 4+ integrations' },
  { value: 'enterprise', label: 'Enterprise — multi-tenant, custom architecture' },
] as const;

export type ComplexityType = (typeof COMPLEXITY)[number]['value'];

export const TIMELINES = [
  { value: 'standard', label: 'Standard (10–16 weeks)', multiplier: 1.0 },
  { value: 'fast', label: 'Fast-track (6–10 weeks)', multiplier: 1.25 },
  { value: 'asap', label: 'ASAP (under 6 weeks)', multiplier: 1.5 },
] as const;

export type TimelineType = (typeof TIMELINES)[number]['value'];

export const ADDONS = [
  { value: 'maintenance', label: 'Monthly maintenance retainer', monthlyCost: 1500 },
  { value: 'support', label: 'Priority support SLA', monthlyCost: 800 },
  { value: 'integrations', label: 'Additional third-party integrations', oneOffCost: 3000 },
  { value: 'training', label: 'Team training sessions', oneOffCost: 1200 },
  { value: 'docs', label: 'Extended documentation package', oneOffCost: 800 },
] as const;

export type AddonType = (typeof ADDONS)[number]['value'];

// ---------------------------------------------------------------------------
// Base price ranges per service × complexity
// ---------------------------------------------------------------------------
type PriceRange = { low: number; high: number };

const BASE_PRICES: Record<ServiceType, Record<ComplexityType, PriceRange>> = {
  lms: {
    small: { low: 5000, high: 12000 },
    medium: { low: 15000, high: 30000 },
    large: { low: 30000, high: 60000 },
    enterprise: { low: 60000, high: 120000 },
  },
  chatbot: {
    small: { low: 5000, high: 12000 },
    medium: { low: 10000, high: 22000 },
    large: { low: 18000, high: 35000 },
    enterprise: { low: 30000, high: 60000 },
  },
  webapp: {
    small: { low: 5000, high: 15000 },
    medium: { low: 15000, high: 35000 },
    large: { low: 30000, high: 60000 },
    enterprise: { low: 50000, high: 100000 },
  },
  api: {
    small: { low: 5000, high: 15000 },
    medium: { low: 12000, high: 30000 },
    large: { low: 25000, high: 55000 },
    enterprise: { low: 40000, high: 90000 },
  },
  automation: {
    small: { low: 3000, high: 10000 },
    medium: { low: 8000, high: 22000 },
    large: { low: 18000, high: 40000 },
    enterprise: { low: 30000, high: 70000 },
  },
};

// ---------------------------------------------------------------------------
// Breakdown labels per service
// ---------------------------------------------------------------------------
const BREAKDOWN_LABELS: Record<ServiceType, Record<ComplexityType, string[]>> = {
  lms: {
    small: ['Discovery & architecture', 'Core LMS setup & configuration', 'Theme & branding', 'Testing & deployment'],
    medium: ['Discovery & architecture', 'Core LMS development', 'Custom theme & UI', '1–3 third-party integrations', 'Testing, QA & deployment'],
    large: ['Discovery & architecture', 'Full LMS development', 'Custom theme & UI', 'SSO & multiple integrations', 'Reporting & analytics', 'Testing, QA & deployment'],
    enterprise: ['Discovery & architecture', 'Multi-tenant LMS build', 'White-label theming per tenant', 'SSO, LDAP & enterprise integrations', 'Advanced reporting', 'Load testing & deployment'],
  },
  chatbot: {
    small: ['Discovery & content audit', 'RAG pipeline & vector DB', 'Chat UI widget', 'Testing & deployment'],
    medium: ['Discovery & use-case scoping', 'RAG pipeline & knowledge base', 'Chat UI + admin dashboard', '1–2 integrations (CRM/helpdesk)', 'Evaluation & QA'],
    large: ['Discovery & architecture', 'Advanced RAG pipeline', 'Multi-channel bot deployment', 'Full helpdesk & CRM integration', 'Analytics dashboard', 'Evaluation & QA'],
    enterprise: ['Discovery & architecture', 'Custom AI pipeline', 'Multi-model orchestration', 'On-premise deployment', 'Role-based access & SSO', 'Enterprise integrations', 'SLA monitoring'],
  },
  webapp: {
    small: ['Discovery & UX', 'React/Next.js frontend', 'Backend API', 'Testing & deployment'],
    medium: ['Discovery & UX design', 'React/Next.js application', 'Node.js backend & database', '1–3 integrations', 'Auth & user management', 'Testing & deployment'],
    large: ['Discovery & architecture', 'React component library', 'Node.js backend', 'Auth, roles & permissions', '4+ integrations', 'E2E test suite', 'CI/CD & deployment'],
    enterprise: ['Discovery & architecture', 'Design system', 'Multi-service backend', 'Complex auth & RBAC', 'Real-time features', 'Performance testing', 'Infrastructure & deployment'],
  },
  api: {
    small: ['Discovery & API design', 'REST API build', 'Auth & validation', 'OpenAPI docs & deployment'],
    medium: ['Discovery & API design', 'REST API build', 'Auth system', '1–3 integrations', 'Testing & OpenAPI docs', 'Deployment'],
    large: ['Discovery & architecture', 'Multi-resource API', 'Auth & RBAC', '4+ integrations', 'Background jobs', 'Test suite & docs', 'CI/CD & deployment'],
    enterprise: ['Discovery & architecture', 'Microservice design', 'API gateway & auth', 'Event-driven processing', 'Multi-tenant data isolation', 'Observability & monitoring'],
  },
  automation: {
    small: ['Process mapping', 'Single workflow build', 'Error handling & alerts', 'Testing & handover docs'],
    medium: ['Process audit', '2–4 workflow builds', 'Multi-system integration', 'Error handling & retry logic', 'Testing & documentation'],
    large: ['Process audit & roadmap', 'Automation platform build', 'Admin UI for workflows', '4+ system integrations', 'Monitoring & alerting', 'Documentation & training'],
    enterprise: ['Process audit & roadmap', 'Enterprise automation platform', 'Orchestration engine', 'Multi-system integration hub', 'SLA monitoring', 'Admin dashboard & controls'],
  },
};

// ---------------------------------------------------------------------------
// Compute estimated price
// ---------------------------------------------------------------------------
export interface PricingEstimate {
  low: number;
  high: number;
  breakdown: string[];
  addOnCosts: { label: string; cost: string }[];
  totalMonthly: number;
  timelineLabel: string;
  disclaimer: string;
}

export function computeEstimate(
  service: ServiceType,
  complexity: ComplexityType,
  timeline: TimelineType,
  addons: AddonType[],
): PricingEstimate {
  const base = BASE_PRICES[service][complexity];
  const timelineData = TIMELINES.find((t) => t.value === timeline)!;
  const multiplier = timelineData.multiplier;

  const low = Math.round((base.low * multiplier) / 500) * 500;
  const high = Math.round((base.high * multiplier) / 500) * 500;

  const breakdown = BREAKDOWN_LABELS[service][complexity];

  const addOnDetails = ADDONS.filter((a) => addons.includes(a.value as AddonType));
  const addOnCosts = addOnDetails.map((a) => ({
    label: a.label,
    cost:
      'monthlyCost' in a
        ? `$${a.monthlyCost.toLocaleString()}/month`
        : `$${(a as { value: string; label: string; oneOffCost: number }).oneOffCost.toLocaleString()} one-off`,
  }));

  const totalMonthly = addOnDetails
    .filter((a) => 'monthlyCost' in a)
    .reduce((sum, a) => sum + (a as { value: string; label: string; monthlyCost: number }).monthlyCost, 0);

  return {
    low,
    high,
    breakdown,
    addOnCosts,
    totalMonthly,
    timelineLabel: timelineData.label,
    disclaimer:
      'These are indicative estimates based on typical project profiles. Actual cost depends on detailed scope, specific integrations, and your content. Request a free proposal for an accurate quote.',
  };
}

export function formatUSD(n: number): string {
  if (n >= 1000) {
    return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  }
  return `$${n.toLocaleString()}`;
}
