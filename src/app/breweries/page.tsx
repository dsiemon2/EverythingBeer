'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Building2, Search, Factory, Sparkles, Star, MapPin, Home, ArrowRight } from 'lucide-react';
import BreweryCard from '@/components/BreweryCard';
import type { Brewery } from '@/types';

const breweryTypeCards = [
  {
    href: '/breweries/commercial',
    name: 'Commercial',
    description: 'Major producers & global brewing companies',
    icon: <Factory className="w-8 h-8" />,
    color: 'from-red-500 to-red-700',
  },
  {
    href: '/breweries/craft',
    name: 'Craft',
    description: 'Independent & artisanal breweries',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-amber-500 to-amber-700',
  },
  {
    href: '/breweries/micro',
    name: 'Micro',
    description: 'Small batch, big flavor producers',
    icon: <Star className="w-8 h-8" />,
    color: 'from-green-500 to-green-700',
  },
  {
    href: '/breweries/regional',
    name: 'Regional',
    description: 'Large-scale craft excellence',
    icon: <MapPin className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-700',
  },
  {
    href: '/breweries/homebrew',
    name: 'Homebrew',
    description: 'Brew your own, your way',
    icon: <Home className="w-8 h-8" />,
    color: 'from-neon-orange to-neon-rust',
  },
];

function BreweriesContent() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const typeParam = searchParams.get('type');

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(typeParam || '');
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
    if (typeParam) setSelectedType(typeParam);
  }, [typeParam]);

  useEffect(() => {
    async function fetchBreweries() {
      setLoading(true);
      try {
        let url = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}`;

        if (searchQuery) {
          url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(searchQuery)}&per_page=20`;
        } else {
          if (selectedType) url += `&by_type=${selectedType}`;
          if (selectedState) url += `&by_state=${selectedState}`;
          if (sortParam === 'name') url += '&sort=name:asc';
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
  }, [searchQuery, selectedType, selectedState, page, sortParam]);

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
            Explore breweries by type or search the complete directory powered by Open Brewery DB.
          </p>
        </div>

        {/* Brewery Type Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {breweryTypeCards.map((type) => (
            <Link
              key={type.href}
              href={type.href}
              className="group relative overflow-hidden rounded-xl border border-amber-200 dark:border-brown-700 hover:shadow-lg transition-all"
            >
              <div className={`bg-gradient-to-br ${type.color} p-5 text-white`}>
                <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  {type.icon}
                </div>
                <h3 className="font-bold text-lg mb-1">{type.name}</h3>
                <p className="text-xs text-white/80 leading-snug">{type.description}</p>
                <ArrowRight className="w-4 h-4 mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-200 dark:border-brown-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-sm font-medium text-brown-500 dark:text-brown-400">
              Browse All Breweries
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search breweries..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
              </div>
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setPage(1); }}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                {breweryTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedState}
                onChange={(e) => { setSelectedState(e.target.value); setPage(1); }}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                {usStates.map((state) => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 animate-pulse">
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
