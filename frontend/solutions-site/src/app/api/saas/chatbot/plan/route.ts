import { NextRequest, NextResponse } from 'next/server';

const PLANS = {
  starter: {
    name: 'Starter',
    price: 299,
    billing: 'month',
    conversations: 500,
    knowledgeBases: 1,
    features: ['Website widget', 'Email escalation', 'Basic analytics'],
  },
  professional: {
    name: 'Professional',
    price: 799,
    billing: 'month',
    conversations: 5000,
    knowledgeBases: 3,
    features: ['Website widget', 'API access', 'CRM integrations', 'Human handoff', 'Custom branding'],
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    billing: 'custom',
    conversations: null,
    knowledgeBases: null,
    features: ['Unlimited conversations', 'Custom model fine-tuning', 'On-premise deployment', 'SLA'],
  },
};

type PlanId = keyof typeof PLANS;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = 'professional' } = body as { plan?: string };

    const planId = (Object.keys(PLANS).includes(plan) ? plan : 'professional') as PlanId;
    const planData = PLANS[planId];

    return NextResponse.json({
      success: true,
      plan: planId,
      ...planData,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to retrieve plan' }, { status: 500 });
  }
}
