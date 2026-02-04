'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Search, Clock, Tag } from 'lucide-react';
import { guides } from '@/data/guides';
import { getGuideImage } from '@/lib/images';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'education', label: 'Education' },
  { value: 'pairing', label: 'Food Pairing' },
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'comparison', label: 'Comparisons' },
  { value: 'beginner', label: 'Beginner' },
];

const categoryColors: Record<string, string> = {
  education: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  pairing: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  seasonal: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  comparison: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  beginner: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
};

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      !searchQuery ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || guide.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              Beer Guides
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            Learn about beer styles, food pairings, and everything you need to become a beer expert.
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
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-brown-700 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
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
              {filteredGuides.length}
            </span>{' '}
            guides
          </p>
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <article className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
                  {/* Featured Image */}
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={getGuideImage(guide.category, guide.slug)}
                      alt={guide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white/30" />
                    </div>
                    <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full shadow-lg ${categoryColors[guide.category] || 'bg-gray-100 text-gray-700'}`}>
                      {guide.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="font-bold text-xl text-brown-800 dark:text-amber-100 mb-2 line-clamp-2">
                      {guide.title}
                    </h2>

                    <p className="text-brown-600 dark:text-brown-300 text-sm mb-4 line-clamp-3">
                      {guide.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-xs"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-brown-500 dark:text-brown-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {guide.read_time} min read
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-brown-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown-700 dark:text-brown-300 mb-2">
              No guides found
            </h3>
            <p className="text-brown-500 dark:text-brown-400">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
