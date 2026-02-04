import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || '';
  const state = searchParams.get('state') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '20';

  try {
    let url = `https://api.openbrewerydb.org/v1/breweries?per_page=${perPage}&page=${page}`;

    if (query) {
      url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(query)}&per_page=${perPage}`;
    } else {
      if (type) {
        url += `&by_type=${type}`;
      }
      if (state) {
        url += `&by_state=${state}`;
      }
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const breweries = await response.json();

    return NextResponse.json({
      count: breweries.length,
      page: parseInt(page),
      breweries,
    });
  } catch (error) {
    console.error('Error fetching breweries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch breweries' },
      { status: 500 }
    );
  }
}
