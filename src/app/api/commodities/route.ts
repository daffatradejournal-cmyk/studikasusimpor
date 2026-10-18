import { NextResponse } from 'next/server';
import { INITIAL_COMMODITIES } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let results = [...INITIAL_COMMODITIES];

  if (category && category !== 'all') {
    results = results.filter((c) => c.categoryId === category);
  }

  if (search) {
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.merchantName.toLowerCase().includes(search) ||
        c.district.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    status: 'success',
    total: results.length,
    data: results,
  });
}
