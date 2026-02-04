import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Brewery not found' },
          { status: 404 }
        );
      }
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const brewery = await response.json();

    return NextResponse.json(brewery);
  } catch (error) {
    console.error('Error fetching brewery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brewery' },
      { status: 500 }
    );
  }
}
