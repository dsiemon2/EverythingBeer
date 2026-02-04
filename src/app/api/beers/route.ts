import { NextRequest, NextResponse } from 'next/server';
import { beers, filterBeers, searchBeers } from '@/data/beers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get('q');
  const style = searchParams.get('style') || undefined;
  const country = searchParams.get('country') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const abv_min = searchParams.get('abv_min') ? parseFloat(searchParams.get('abv_min')!) : undefined;
  const abv_max = searchParams.get('abv_max') ? parseFloat(searchParams.get('abv_max')!) : undefined;
  const availability = searchParams.get('availability') || undefined;
  const is_craft = searchParams.get('is_craft') === 'true' ? true : searchParams.get('is_craft') === 'false' ? false : undefined;

  let results = beers;

  // Apply search query
  if (q) {
    results = searchBeers(q);
  }

  // Apply filters
  if (style || country || tag || abv_min || abv_max || availability || is_craft !== undefined) {
    const filtered = filterBeers({
      style,
      country,
      tag,
      abv_min,
      abv_max,
      availability,
      is_craft,
    });

    if (q) {
      // Intersect search results with filtered results
      results = results.filter((b) => filtered.some((fb) => fb.id === b.id));
    } else {
      results = filtered;
    }
  }

  return NextResponse.json({
    count: results.length,
    beers: results,
  });
}
