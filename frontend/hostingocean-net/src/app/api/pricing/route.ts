import { NextResponse } from 'next/server';
import { getPlans } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans, {
      headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to load pricing data' }, { status: 500 });
  }
}
