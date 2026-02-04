'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFiltersProps {
  styles: FilterOption[];
  countries: FilterOption[];
  tags: FilterOption[];
}

export default function SearchFilters({ styles, countries, tags }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentFilters = {
    style: searchParams.get('style') || '',
    country: searchParams.get('country') || '',
    tag: searchParams.get('tag') || '',
    abv_min: searchParams.get('abv_min') || '',
    abv_max: searchParams.get('abv_max') || '',
    availability: searchParams.get('availability') || '',
    is_craft: searchParams.get('is_craft') || '',
  };

  const activeFilterCount = Object.values(currentFilters).filter(Boolean).length;

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(window.location.pathname);
  };

  return (
    <div className="mb-6">
      {/* Filter toggle button (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-700 rounded-lg w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filters panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
        <div className="bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-brown-800 dark:text-amber-100">Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Style filter */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                Style
              </label>
              <select
                value={currentFilters.style}
                onChange={(e) => updateFilters('style', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">All Styles</option>
                {styles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Country filter */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                Country
              </label>
              <select
                value={currentFilters.country}
                onChange={(e) => updateFilters('country', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag filter */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                Flavor
              </label>
              <select
                value={currentFilters.tag}
                onChange={(e) => updateFilters('tag', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">All Flavors</option>
                {tags.map((tag) => (
                  <option key={tag.value} value={tag.value}>
                    {tag.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ABV range */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                ABV Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="20"
                  step="0.5"
                  value={currentFilters.abv_min}
                  onChange={(e) => updateFilters('abv_min', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <span className="text-brown-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  min="0"
                  max="20"
                  step="0.5"
                  value={currentFilters.abv_max}
                  onChange={(e) => updateFilters('abv_max', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                Availability
              </label>
              <select
                value={currentFilters.availability}
                onChange={(e) => updateFilters('availability', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="year-round">Year-Round</option>
                <option value="seasonal">Seasonal</option>
                <option value="limited">Limited Release</option>
              </select>
            </div>

            {/* Craft/Commercial */}
            <div>
              <label className="block text-sm font-medium text-brown-600 dark:text-brown-300 mb-1">
                Type
              </label>
              <select
                value={currentFilters.is_craft}
                onChange={(e) => updateFilters('is_craft', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">All Beers</option>
                <option value="true">Craft Only</option>
                <option value="false">Commercial Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
