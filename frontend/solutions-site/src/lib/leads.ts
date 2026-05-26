/**
 * Lead scoring and tagging utilities.
 * Used by the quote API route to enrich leads before storage.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface LeadScoreInput {
  service: string;
  budget: string;
  urgency?: string;
  companySize?: string;
  description?: string;
}

export interface LeadScore {
  score: number;          // 0–100
  tier: 'hot' | 'warm' | 'cool';
  tags: string[];
}

// ---------------------------------------------------------------------------
// Budget scoring (higher budget = higher score)
// ---------------------------------------------------------------------------
const BUDGET_SCORES: Record<string, number> = {
  'Under $5,000': 5,
  '$5,000 – $15,000': 20,
  '$15,000 – $30,000': 40,
  '$30,000 – $60,000': 60,
  '$60,000+': 80,
  'Not Sure Yet': 10,
};

// ---------------------------------------------------------------------------
// Service scoring (services with higher typical value score higher)
// ---------------------------------------------------------------------------
const SERVICE_SCORES: Record<string, number> = {
  'LMS Development': 15,
  'AI Chatbot Development': 15,
  'React / Next.js Development': 10,
  'Node.js API Development': 10,
  'Automation & Integrations': 10,
  'Other / Not Sure Yet': 5,
};

// ---------------------------------------------------------------------------
// Budget range tag
// ---------------------------------------------------------------------------
function budgetRangeTag(budget: string): string {
  if (budget.includes('Under')) return 'budget-under-5k';
  if (budget.includes('5,000') && budget.includes('15,000')) return 'budget-5k-15k';
  if (budget.includes('15,000') && budget.includes('30,000')) return 'budget-15k-30k';
  if (budget.includes('30,000') && budget.includes('60,000')) return 'budget-30k-60k';
  if (budget.includes('60,000+')) return 'budget-60k-plus';
  return 'budget-unknown';
}

// ---------------------------------------------------------------------------
// Service tag
// ---------------------------------------------------------------------------
function serviceTag(service: string): string {
  const map: Record<string, string> = {
    'LMS Development': 'service-lms',
    'AI Chatbot Development': 'service-chatbot',
    'React / Next.js Development': 'service-react',
    'Node.js API Development': 'service-nodejs',
    'Automation & Integrations': 'service-automation',
    'Other / Not Sure Yet': 'service-other',
  };
  return map[service] ?? 'service-unknown';
}

// ---------------------------------------------------------------------------
// Urgency signals from description text
// ---------------------------------------------------------------------------
function detectUrgency(description: string): 'high' | 'medium' | 'low' {
  const lower = description.toLowerCase();
  const highSignals = ['asap', 'urgent', 'immediately', 'deadline', 'launch', 'go live', 'quickly'];
  const medSignals = ['soon', 'months', 'quarter', 'this year'];
  if (highSignals.some((s) => lower.includes(s))) return 'high';
  if (medSignals.some((s) => lower.includes(s))) return 'medium';
  return 'low';
}

// ---------------------------------------------------------------------------
// Company size signals
// ---------------------------------------------------------------------------
function detectCompanySize(description: string): 'enterprise' | 'mid-market' | 'small' {
  const lower = description.toLowerCase();
  const enterpriseSignals = ['enterprise', 'global', 'multinational', 'international', 'thousands of', 'corporation'];
  const midSignals = ['team of', 'company of', 'employees', 'staff', 'clients'];
  if (enterpriseSignals.some((s) => lower.includes(s))) return 'enterprise';
  if (midSignals.some((s) => lower.includes(s))) return 'mid-market';
  return 'small';
}

// ---------------------------------------------------------------------------
// Main scoring function
// ---------------------------------------------------------------------------
export function scoreLead(input: LeadScoreInput): LeadScore {
  const budgetScore = BUDGET_SCORES[input.budget] ?? 0;
  const serviceScore = SERVICE_SCORES[input.service] ?? 0;

  const urgency = input.urgency
    ? (input.urgency as 'high' | 'medium' | 'low')
    : detectUrgency(input.description ?? '');

  const companySize = input.companySize
    ? (input.companySize as 'enterprise' | 'mid-market' | 'small')
    : detectCompanySize(input.description ?? '');

  const urgencyScore = urgency === 'high' ? 10 : urgency === 'medium' ? 5 : 0;
  const sizeScore = companySize === 'enterprise' ? 10 : companySize === 'mid-market' ? 5 : 0;

  // Description quality bonus (more detailed = more serious)
  const descLength = (input.description ?? '').length;
  const qualityBonus = descLength > 400 ? 5 : descLength > 150 ? 3 : 0;

  const total = Math.min(100, budgetScore + serviceScore + urgencyScore + sizeScore + qualityBonus);

  const tier: LeadScore['tier'] = total >= 60 ? 'hot' : total >= 30 ? 'warm' : 'cool';

  const tags: string[] = [
    serviceTag(input.service),
    budgetRangeTag(input.budget),
    `urgency-${urgency}`,
    `size-${companySize}`,
  ];

  return { score: total, tier, tags };
}
