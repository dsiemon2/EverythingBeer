import { NextRequest, NextResponse } from 'next/server';
import { getStyleById } from '@/data/styles';
import { getBeersByStyle } from '@/data/beers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const style = getStyleById(id);

  if (!style) {
    return NextResponse.json(
      { error: 'Style not found' },
      { status: 404 }
    );
  }

  const beers = getBeersByStyle(id);

  return NextResponse.json({
    ...style,
    beers,
  });
}
