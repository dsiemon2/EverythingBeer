'use client';

import { useState, useEffect, Suspense } from 'react';
import { Building2, Search, MapPin, Filter } from 'lucide-react';
import BreweryCard from '@/components/BreweryCard';
import type { Brewery } from '@/types';

function BreweriesContent() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    async function fetchBreweries() {
      setLoading(true);
      try {
        let url = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}`;

        if (searchQuery) {
          url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(searchQuery)}&per_page=20`;
        } else {
          if (selectedType) {
            url += `&by_type=${selectedType}`;
          }
          if (selectedState) {
            url += `&by_state=${selectedState}`;
          }
        }

        const response = await fetch(url);
        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setBreweries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBreweries();
  }, [searchQuery, selectedType, selectedState, page]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              Breweries
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            Discover breweries from around the world powered by Open Brewery DB.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search breweries..."
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

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                {breweryTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

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
