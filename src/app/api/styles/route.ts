import { NextResponse } from 'next/server';
import { styles, getStyleCategories } from '@/data/styles';

export async function GET() {
  const categories = getStyleCategories();

  return NextResponse.json({
    count: styles.length,
    categories,
    styles,
  });
}
