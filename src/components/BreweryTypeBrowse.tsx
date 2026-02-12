'use client';

import { useState, useEffect } from 'react';
import { Building2, Search } from 'lucide-react';
import BreweryCard from '@/components/BreweryCard';
import type { Brewery } from '@/types';

interface BreweryTypeBrowseProps {
  openBreweryDbTypes: string[];
  typeName: string;
}

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
  { value: 'ohio', label: 'Ohio' },
  { value: 'virginia', label: 'Virginia' },
  { value: 'illinois', label: 'Illinois' },
  { value: 'massachusetts', label: 'Massachusetts' },
  { value: 'maine', label: 'Maine' },
  { value: 'vermont', label: 'Vermont' },
  { value: 'wisconsin', label: 'Wisconsin' },
  { value: 'indiana', label: 'Indiana' },
  { value: 'minnesota', label: 'Minnesota' },
];

export default function BreweryTypeBrowse({ openBreweryDbTypes, typeName }: BreweryTypeBrowseProps) {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);

  const hasMultipleTypes = openBreweryDbTypes.length > 1;

  useEffect(() => {
    async function fetchBreweries() {
      setLoading(true);
      try {
        if (searchQuery) {
          const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(searchQuery)}&per_page=20`;
          const response = await fetch(url);
          const data = await response.json();
          // Filter search results to only show matching types
          const filtered = data.filter((b: Brewery) =>
            openBreweryDbTypes.includes(b.brewery_type)
          );
          setBreweries(filtered);
        } else {
          // Fetch from first type
          const primaryType = openBreweryDbTypes[0];
          let url = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}&by_type=${primaryType}`;
          if (selectedState) url += `&by_state=${selectedState}`;

          const response = await fetch(url);
          const data = await response.json();

          // If multiple types (e.g., craft = micro + regional), fetch additional types
          if (hasMultipleTypes) {
            const additionalResults: Brewery[] = [];
            for (let i = 1; i < openBreweryDbTypes.length; i++) {
              let addUrl = `https://api.openbrewerydb.org/v1/breweries?per_page=20&page=${page}&by_type=${openBreweryDbTypes[i]}`;
              if (selectedState) addUrl += `&by_state=${selectedState}`;
              const addResponse = await fetch(addUrl);
              const addData = await addResponse.json();
              additionalResults.push(...addData);
            }

            // Combine and deduplicate
            const combined = [...data, ...additionalResults];
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
        }
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setBreweries([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBreweries();
  }, [searchQuery, selectedState, page, openBreweryDbTypes, hasMultipleTypes]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${typeName.toLowerCase()}...`}
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
              <span className="text-amber-600 dark:text-amber-400"> from Open Brewery DB</span>
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
  );
}
