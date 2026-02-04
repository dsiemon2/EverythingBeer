import { NextRequest, NextResponse } from 'next/server';
import { getBeerById } from '@/data/beers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const beer = getBeerById(id);

  if (!beer) {
    return NextResponse.json(
      { error: 'Beer not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(beer);
}
