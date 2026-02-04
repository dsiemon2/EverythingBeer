'use client';

import { useState } from 'react';
import { Layers, Search, Filter } from 'lucide-react';
import StyleCard from '@/components/StyleCard';
import { styles, getStyleCategories } from '@/data/styles';

export default function StylesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = getStyleCategories();

  const filteredStyles = styles.filter((style) => {
    const matchesSearch =
      !searchQuery ||
      style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || style.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const groupedStyles = filteredStyles.reduce(
    (acc, style) => {
      if (!acc[style.category]) {
        acc[style.category] = [];
      }
      acc[style.category].push(style);
      return acc;
    },
    {} as Record<string, typeof styles>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              Beer Styles
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            Explore {styles.length} beer styles based on BJCP 2021 guidelines. Understand what makes each style unique.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-brown-600 dark:text-brown-300">
            Showing{' '}
            <span className="font-semibold text-brown-800 dark:text-amber-100">
              {filteredStyles.length}
            </span>{' '}
            styles in{' '}
            <span className="font-semibold text-brown-800 dark:text-amber-100">
              {Object.keys(groupedStyles).length}
            </span>{' '}
            categories
          </p>
        </div>

        {/* Styles by Category */}
        {Object.entries(groupedStyles).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedStyles).map(([category, categoryStyles]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
                  {category}
                  <span className="text-sm font-normal text-brown-500 dark:text-brown-400">
                    ({categoryStyles.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryStyles.map((style) => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Layers className="w-16 h-16 text-brown-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700 dark:text-brown-300 mb-2">
              No styles found
            </h3>
            <p className="text-brown-500 dark:text-brown-400">
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {/* Style Guide Info */}
        <div className="mt-16 bg-amber-50 dark:bg-brown-800 rounded-2xl p-8 border border-amber-200 dark:border-brown-700">
          <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            About Beer Style Guidelines
          </h2>
          <div className="prose prose-amber dark:prose-invert max-w-none">
            <p className="text-brown-600 dark:text-brown-300">
              Our style database is based on the <strong>BJCP 2021 Style Guidelines</strong> (Beer Judge
              Certification Program), which is the most widely used standard for categorizing beer styles
              in the craft beer community.
            </p>
            <p className="text-brown-600 dark:text-brown-300 mt-4">
              Each style includes key metrics like:
            </p>
            <ul className="text-brown-600 dark:text-brown-300 mt-2 space-y-1">
              <li><strong>ABV (Alcohol By Volume)</strong> - The percentage of alcohol</li>
              <li><strong>IBU (International Bitterness Units)</strong> - A measure of bitterness from hops</li>
              <li><strong>SRM (Standard Reference Method)</strong> - A measure of beer color</li>
              <li><strong>OG/FG (Original/Final Gravity)</strong> - Measures of sugar content before and after fermentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
