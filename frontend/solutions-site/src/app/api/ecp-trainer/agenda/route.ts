import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'Agenda upload is currently disabled.',
    },
    { status: 410 }
  );
}
