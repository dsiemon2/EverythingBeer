'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { pintSizedPosts } from '@/data/pint-sized-posts';

const categoryColors: Record<string, string> = {
  history: 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20',
  science: 'border-l-green-500 bg-green-50 dark:bg-green-900/20',
  culture: 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20',
  stats: 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20',
  'did-you-know': 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20',
};

const categoryBadgeColors: Record<string, string> = {
  history: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  science: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  culture: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  stats: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  'did-you-know': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
};

const categoryLabels: Record<string, string> = {
  history: 'History',
  science: 'Science',
  culture: 'Culture',
  stats: 'Stats',
  'did-you-know': 'Did You Know?',
};

export default function PintSizedPostsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFacts =
    selectedCategory === 'all'
      ? pintSizedPosts
      : pintSizedPosts.filter((f) => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-brown-900 dark:via-brown-800 dark:to-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              Quick Facts
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brown-900 dark:text-amber-50 mb-4">
              Pint-Sized Posts
            </h1>
            <p className="text-lg text-brown-600 dark:text-amber-200 max-w-2xl mx-auto">
              Quick beer facts to impress your friends. Bite-sized knowledge for your next bar conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-100 dark:bg-brown-800 text-brown-700 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-brown-700'
              }`}
            >
              All
            </button>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === value
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 dark:bg-brown-800 text-brown-700 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-brown-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-brown-500 dark:text-brown-400 mb-6">
            {filteredFacts.length} fact{filteredFacts.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacts.map((fact) => (
              <div
                key={fact.id}
                className={`rounded-xl border-l-4 p-6 border border-amber-100 dark:border-brown-700 ${categoryColors[fact.category] || 'bg-white dark:bg-brown-800'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{fact.icon || '🍺'}</span>
                  <div>
                    <p className="text-brown-700 dark:text-amber-100 leading-relaxed mb-3">
                      {fact.fact}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryBadgeColors[fact.category] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {categoryLabels[fact.category] || fact.category}
                      </span>
                      {fact.source && (
                        <span className="text-xs text-brown-400 dark:text-brown-500">
                          Source: {fact.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
