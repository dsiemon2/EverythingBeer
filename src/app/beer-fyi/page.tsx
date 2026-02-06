'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Search, Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { getAuthorById } from '@/data/authors';
import { getBlogImage } from '@/lib/images';

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  reviews: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  culture: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  events: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  opinion: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  industry: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
};

const categoryLabels: Record<string, string> = {
  news: 'News',
  reviews: 'Reviews',
  culture: 'Culture',
  events: 'Events',
  opinion: 'Opinion',
  industry: 'Industry',
};

export default function BeerFYIPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-brown-900 dark:via-brown-800 dark:to-amber-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              <Newspaper className="w-4 h-4" />
              Beer FYI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brown-900 dark:text-amber-50 mb-4">
              Beer FYI
            </h1>
            <p className="text-lg text-brown-600 dark:text-amber-200 max-w-2xl mx-auto">
              News, reviews, culture, and everything in between. Stay informed about the world of beer.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100"
            >
              <option value="all">All Categories</option>
              <option value="news">News</option>
              <option value="reviews">Reviews</option>
              <option value="culture">Culture</option>
              <option value="events">Events</option>
              <option value="opinion">Opinion</option>
              <option value="industry">Industry</option>
            </select>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-brown-500 dark:text-brown-400 mb-6">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-brown-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brown-800 dark:text-amber-100 mb-2">
                No articles found
              </h3>
              <p className="text-brown-600 dark:text-brown-300">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const author = getAuthorById(post.author_id);
                return (
                  <Link key={post.id} href={`/beer-fyi/${post.slug}`}>
                    <article className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full flex flex-col">
                      {/* Image */}
                      <div className="h-48 relative overflow-hidden">
                        <Image
                          src={getBlogImage(post.category, post.slug)}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                            {categoryLabels[post.category] || post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="font-bold text-lg text-brown-800 dark:text-amber-100 mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-brown-600 dark:text-brown-300 text-sm line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Author & Meta */}
                        <div className="flex items-center justify-between text-sm border-t border-amber-100 dark:border-brown-700 pt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center">
                              <User className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                            </div>
                            <span className="text-brown-600 dark:text-brown-300 font-medium">
                              {author?.name || 'Staff'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-brown-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.read_time} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
