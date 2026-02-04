'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Beer as BeerIcon, Search } from 'lucide-react';
import BeerCard from '@/components/BeerCard';
import SearchFilters from '@/components/SearchFilters';
import { beers, filterBeers, searchBeers } from '@/data/beers';
import { styles } from '@/data/styles';
import type { Beer } from '@/types';

function BeersContent() {
  const searchParams = useSearchParams();
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>(beers);
  const [searchQuery, setSearchQuery] = useState('');
  const filter = searchParams.get('filter');

  const getPageTitle = () => {
    switch (filter) {
      case 'craft': return 'Craft Beers';
      case 'commercial': return 'Commercial Beers';
      case 'trending': return 'Trending Beers';
      default: return 'All Beers';
    }
  };

  const getPageDescription = () => {
    switch (filter) {
      case 'craft': return 'Discover artisanal and independent craft beers from small breweries.';
      case 'commercial': return 'Popular mainstream beers from major breweries worldwide.';
      case 'trending': return 'The most searched and popular beers right now.';
      default: return `Explore our database of ${beers.length}+ beers from craft breweries and commercial producers.`;
    }
  };

  const styleOptions = styles.map((s) => ({ value: s.id, label: s.name }));
  const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'germany', label: 'Germany' },
    { value: 'belgium', label: 'Belgium' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ireland', label: 'Ireland' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'netherlands', label: 'Netherlands' },
    { value: 'czech republic', label: 'Czech Republic' },
  ];
  const tagOptions = [
    { value: 'hoppy', label: 'Hoppy' },
    { value: 'malty', label: 'Malty' },
    { value: 'crisp', label: 'Crisp' },
    { value: 'roasty', label: 'Roasty' },
    { value: 'fruity', label: 'Fruity' },
    { value: 'sour', label: 'Sour' },
    { value: 'spicy', label: 'Spicy' },
  ];

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const filter = searchParams.get('filter') || undefined;
    const style = searchParams.get('style') || undefined;
    const country = searchParams.get('country') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const abv_min = searchParams.get('abv_min') ? parseFloat(searchParams.get('abv_min')!) : undefined;
    const abv_max = searchParams.get('abv_max') ? parseFloat(searchParams.get('abv_max')!) : undefined;
    const availability = searchParams.get('availability') || undefined;
    const is_craft = searchParams.get('is_craft') === 'true' ? true : searchParams.get('is_craft') === 'false' ? false : undefined;

    setSearchQuery(q);

    let results = beers;

    // Handle mega menu filter param
    if (filter === 'craft') {
      results = results.filter((b) => b.is_craft);
    } else if (filter === 'commercial') {
      results = results.filter((b) => b.is_commercial);
    } else if (filter === 'trending') {
      results = results.filter((b) => b.is_trending);
    }

    if (q) {
      const searchResults = searchBeers(q);
      results = results.filter((b) => searchResults.some((sr) => sr.id === b.id));
    }

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
      results = results.filter((b) => filtered.some((f) => f.id === b.id));
    }

    setFilteredBeers(results);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BeerIcon className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              {getPageTitle()}
            </h1>
            {filter && (
              <span className="px-3 py-1 text-sm font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full">
                {filter === 'trending' ? 'Hot' : filter}
              </span>
            )}
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            {getPageDescription()}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search beers by name, brewery, or style..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setFilteredBeers(searchBeers(e.target.value));
                } else {
                  setFilteredBeers(beers);
                }
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>
        </div>

        {/* Filters */}
        <SearchFilters
          styles={styleOptions}
          countries={countryOptions}
          tags={tagOptions}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-brown-600 dark:text-brown-300">
            Showing <span className="font-semibold text-brown-800 dark:text-amber-100">{filteredBeers.length}</span> beers
          </p>
        </div>

        {/* Beer Grid */}
        {filteredBeers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBeers.map((beer) => (
              <BeerCard key={beer.id} beer={beer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BeerIcon className="w-16 h-16 text-brown-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700 dark:text-brown-300 mb-2">
              No beers found
            </h3>
            <p className="text-brown-500 dark:text-brown-400">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BeersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="animate-pulse text-amber-600">Loading beers...</div>
      </div>
    }>
      <BeersContent />
    </Suspense>
  );
}
