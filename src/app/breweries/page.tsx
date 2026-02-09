'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, Search, MapPin, Filter, Star, Globe, Sparkles, Factory } from 'lucide-react';
import Image from 'next/image';
import BreweryCard from '@/components/BreweryCard';
import type { Brewery } from '@/types';
import { getBreweryImage } from '@/lib/images';
import { commercialBreweries, craftBreweries, type CuratedBrewery } from '@/data/curated-breweries';

function CuratedBreweryCard({ brewery }: { brewery: CuratedBrewery }) {
  return (
    <div className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border-2 border-amber-300 dark:border-amber-600 h-full hover:shadow-lg hover:shadow-amber-200/30 dark:hover:shadow-amber-900/20 transition-all duration-300">
      {/* Header with image */}
      <div className="relative h-36 overflow-hidden">
        <Image
          src={getBreweryImage(brewery.id)}
          alt={brewery.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Featured badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500 text-white shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3" /> Featured
        </span>

        {/* Brewery type badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full bg-white/90 text-brown-700 shadow-lg">
          Est. {brewery.founded}
        </span>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-lg text-white line-clamp-1 drop-shadow-lg">
            {brewery.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-brown-600 dark:text-brown-300 line-clamp-3 mb-3">
          {brewery.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-brown-500 dark:text-brown-400">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {[brewery.city, brewery.state, brewery.country]
              .filter(Boolean)
              .join(', ')}
          </span>
        </div>

        {/* Flagship beer */}
        {brewery.flagship_beer && (
          <div className="flex items-center gap-2 mt-2 text-sm text-amber-600 dark:text-amber-400">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span>Flagship: {brewery.flagship_beer}</span>
          </div>
        )}

        {/* Website */}
        {brewery.website_url && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Globe className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 truncate hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {brewery.website_url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function BreweriesContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter'); // 'commercial' or 'craft'
  const typeParam = searchParams.get('type'); // direct type filter from menu
  const sortParam = searchParams.get('sort'); // 'name' for A-Z

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(typeParam || '');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);

  // Determine page title and description based on filter
  const getPageInfo = () => {
    if (filterParam === 'commercial') {
      return {
        title: 'Commercial Breweries',
        description: 'Major beer producers and global brewing companies. These are the large-scale breweries that produce the world\'s most recognized beer brands.',
        icon: <Factory className="w-8 h-8 text-amber-600" />,
      };
    }
    if (filterParam === 'craft') {
      return {
        title: 'Craft Breweries',
        description: 'Independent and artisanal breweries crafting unique, flavorful beers. From microbreweries to regional craft producers pushing the boundaries of beer.',
        icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      };
    }
    if (typeParam === 'micro') {
      return {
        title: 'Microbreweries',
        description: 'Small batch breweries producing under 15,000 barrels per year. Where innovation and passion meet the pint glass.',
        icon: <Building2 className="w-8 h-8 text-amber-600" />,
      };
    }
    if (typeParam === 'brewpub') {
      return {
        title: 'Brewpubs',
        description: 'Restaurants and bars that brew their own beer on-site. The ultimate brew-and-dine experience.',
        icon: <Building2 className="w-8 h-8 text-amber-600" />,
      };
    }
    if (typeParam === 'regional') {
      return {
        title: 'Regional Breweries',
        description: 'Large craft breweries producing between 15,000 and 6,000,000 barrels per year. Regional powerhouses shaping the craft beer landscape.',
        icon: <Building2 className="w-8 h-8 text-amber-600" />,
      };
    }
    if (sortParam === 'name') {
      return {
        title: 'Browse Breweries A-Z',
        description: 'Explore our complete brewery directory in alphabetical order.',
        icon: <Building2 className="w-8 h-8 text-amber-600" />,
      };
    }
    return {
      title: 'Breweries',
      description: 'Discover breweries from around the world powered by Open Brewery DB.',
      icon: <Building2 className="w-8 h-8 text-amber-600" />,
    };
  };

  const pageInfo = getPageInfo();

  // Get curated breweries for filtered views
  const getCuratedBreweries = (): CuratedBrewery[] => {
    if (filterParam === 'commercial') return commercialBreweries;
    if (filterParam === 'craft') return craftBreweries;
    return [];
  };

  const curatedList = getCuratedBreweries();

  const breweryTypes = [
    { value: '', label: 'All Types' },
    { value: 'micro', label: 'Microbrewery' },
    { value: 'nano', label: 'Nanobrewery' },
    { value: 'regional', label: 'Regional' },
    { value: 'brewpub', label: 'Brewpub' },
    { value: 'large', label: 'Large' },
    { value: 'planning', label: 'Planning' },
    { value: 'contract', label: 'Contract' },
  ];

  const usStates = [
    { value: '', label: 'All States' },
    { value: 'california', label: 'California' },
    { value: 'colorado', label: 'Colorado' },
    { value: 'texas', label: 'Texas' },
    { value: 'new_york', label: 'New York' },
    { value: 'michigan', label: 'Michigan' },
    { value: 'oregon', label: 'Oregon' },
    { value: 'washington', label: 'Washington' },
    { value: 'florida', label: 'Florida' },
    { value: 'pennsylvania', label: 'Pennsylvania' },
    { value: 'north_carolina', label: 'North Carolina' },
  ];

  // Initialize selectedType from URL params
  useEffect(() => {
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, [typeParam]);

  useEffect(() => {
    async function fetchBreweries() {
      setLoading(true);
      try {
        let url = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}`;

        if (searchQuery) {
          url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(searchQuery)}&per_page=20`;
        } else {
          // Handle filter param mapping
          if (filterParam === 'commercial') {
            url += '&by_type=large';
          } else if (filterParam === 'craft') {
            // For craft, we combine micro and regional results
            // The API doesn't support multiple types, so we use micro as default
            // and add regional type option for users
            if (selectedType) {
              url += `&by_type=${selectedType}`;
            } else {
              url += '&by_type=micro';
            }
          } else if (selectedType) {
            url += `&by_type=${selectedType}`;
          }

          if (selectedState) {
            url += `&by_state=${selectedState}`;
          }

          if (sortParam === 'name') {
            url += '&sort=name:asc';
          }
        }

        const response = await fetch(url);
        const data = await response.json();

        // If craft filter and no specific type selected, also fetch regional
        if (filterParam === 'craft' && !selectedType && !searchQuery) {
          const regionalUrl = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}&by_type=regional${selectedState ? `&by_state=${selectedState}` : ''}`;
          const regionalResponse = await fetch(regionalUrl);
          const regionalData = await regionalResponse.json();

          // Combine and deduplicate
          const combined = [...data, ...regionalData];
          const seen = new Set<string>();
          const unique = combined.filter((b: Brewery) => {
            if (seen.has(b.id)) return false;
            seen.add(b.id);
            return true;
          });
          setBreweries(unique);
        } else {
          setBreweries(data);
        }
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setBreweries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBreweries();
  }, [searchQuery, selectedType, selectedState, page, filterParam, sortParam]);

  // For craft filter, show craft-specific type options
  const getTypeOptions = () => {
    if (filterParam === 'craft') {
      return [
        { value: '', label: 'All Craft Types' },
        { value: 'micro', label: 'Microbrewery' },
        { value: 'regional', label: 'Regional' },
        { value: 'brewpub', label: 'Brewpub' },
        { value: 'nano', label: 'Nanobrewery' },
      ];
    }
    if (filterParam === 'commercial') {
      return [
        { value: '', label: 'Large Breweries' },
      ];
    }
    return breweryTypes;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {pageInfo.icon}
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              {pageInfo.title}
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            {pageInfo.description}
          </p>
        </div>

        {/* Curated Featured Breweries Section */}
        {curatedList.length > 0 && !searchQuery && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-brown-800 dark:text-amber-100">
                {filterParam === 'commercial' ? 'Major Brewing Companies' : 'Notable Craft Breweries'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
              {curatedList.map((brewery) => (
                <CuratedBreweryCard key={brewery.id} brewery={brewery} />
              ))}
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200 dark:border-brown-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-sm text-brown-500 dark:text-brown-400">
                  {filterParam === 'commercial' ? 'More Large Breweries from Open Brewery DB' : 'More Craft Breweries from Open Brewery DB'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-4 mb-6">
          <div className={`grid grid-cols-1 gap-4 ${filterParam === 'commercial' ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
            {/* Search */}
            <div className={filterParam === 'commercial' ? 'md:col-span-2' : 'md:col-span-2'}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${filterParam ? filterParam + ' ' : ''}breweries...`}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
              </div>
            </div>

            {/* Type Filter - hidden for commercial (always large) */}
            {filterParam !== 'commercial' && (
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
                >
                  {getTypeOptions().map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* State Filter */}
            <div>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                {usStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 animate-pulse"
              >
                <div className="h-32 bg-amber-200 dark:bg-brown-700" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-amber-100 dark:bg-brown-700 rounded w-3/4" />
                  <div className="h-4 bg-amber-100 dark:bg-brown-700 rounded w-1/2" />
                  <div className="h-4 bg-amber-100 dark:bg-brown-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : breweries.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-brown-600 dark:text-brown-300">
                Showing <span className="font-semibold text-brown-800 dark:text-amber-100">{breweries.length}</span> breweries
                {filterParam && <span className="text-amber-600 dark:text-amber-400"> from Open Brewery DB</span>}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {breweries.map((brewery) => (
                <BreweryCard key={brewery.id} brewery={brewery} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-700 text-brown-700 dark:text-amber-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-brown-700 transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium">
                Page {page}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={breweries.length < 20}
                className="px-4 py-2 rounded-lg bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-700 text-brown-700 dark:text-amber-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-brown-700 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-brown-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700 dark:text-brown-300 mb-2">
              No breweries found
            </h3>
            <p className="text-brown-500 dark:text-brown-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BreweriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="animate-pulse text-amber-600">Loading breweries...</div>
      </div>
    }>
      <BreweriesContent />
    </Suspense>
  );
}
