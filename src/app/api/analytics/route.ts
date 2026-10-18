import { NextResponse } from 'next/server';
import { INITIAL_ANALYTICS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: INITIAL_ANALYTICS,
  });
}
