'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Beer, Building2, Layers, GitCompare, BookOpen, Search, ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import BeerCard from '@/components/BeerCard';
import { beers } from '@/data/beers';
import { guides } from '@/data/guides';
import { getGuideImage } from '@/lib/images';

const features = [
  {
    icon: <Beer className="w-8 h-8" />,
    title: 'Discover Beers',
    description: 'Explore our database of craft and commercial beers from around the world.',
    href: '/beers',
    color: 'bg-amber-500',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Find Breweries',
    description: 'Discover breweries near you and explore their flagship offerings.',
    href: '/breweries',
    color: 'bg-orange-500',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Learn Styles',
    description: 'Understand the differences between 90+ beer styles with our comprehensive guides.',
    href: '/styles',
    color: 'bg-yellow-500',
  },
  {
    icon: <GitCompare className="w-8 h-8" />,
    title: 'Compare Beers',
    description: 'Side-by-side comparisons to help you find your next favorite beer.',
    href: '/compare',
    color: 'bg-green-500',
  },
];

export default function Home() {
  const featuredBeers = beers.slice(0, 4);
  const trendingBeers = beers.filter(b => b.is_craft).slice(0, 4);
  const featuredGuides = guides.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-brown-900 dark:via-brown-800 dark:to-amber-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Your Ultimate Beer Companion
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-brown-900 dark:text-amber-50 mb-6">
              Discover, Compare &<br />
              <span className="gradient-text">Understand Beer</span>
            </h1>
            <p className="text-xl text-brown-600 dark:text-amber-200 max-w-2xl mx-auto mb-10">
              From craft favorites to commercial classics, find your perfect pour with
              structured comparisons and explainable recommendations.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search beers, breweries, or styles..."
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/20 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-brown-400" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">500+</div>
                <div className="text-sm text-brown-500 dark:text-brown-400">Beers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">8,000+</div>
                <div className="text-sm text-brown-500 dark:text-brown-400">Breweries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">90+</div>
                <div className="text-sm text-brown-500 dark:text-brown-400">Styles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">50+</div>
                <div className="text-sm text-brown-500 dark:text-brown-400">Comparisons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-brown-600 dark:text-brown-300 max-w-2xl mx-auto">
              Whether you're a craft beer enthusiast or just starting your journey,
              we've got the tools to help you explore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="beer-card bg-white dark:bg-brown-800 rounded-2xl p-6 border border-amber-100 dark:border-brown-700 h-full">
                  <div className={`inline-flex p-3 rounded-xl ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brown-800 dark:text-amber-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brown-600 dark:text-brown-300">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-amber-600 dark:text-amber-400 font-medium">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Beers */}
      <section className="py-20 bg-amber-50 dark:bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium mb-2">
                <Star className="w-4 h-4" />
                FEATURED
              </div>
              <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
                Popular Beers
              </h2>
            </div>
            <Link href="/beers" className="hidden sm:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBeers.map((beer) => (
              <BeerCard key={beer.id} beer={beer} />
            ))}
          </div>

          <Link href="/beers" className="sm:hidden flex items-center justify-center gap-2 mt-6 text-amber-600 font-medium">
            View All Beers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trending Craft Beers */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium mb-2">
                <TrendingUp className="w-4 h-4" />
                TRENDING
              </div>
              <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
                Craft Favorites
              </h2>
            </div>
            <Link href="/beers?is_craft=true" className="hidden sm:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingBeers.map((beer) => (
              <BeerCard key={beer.id} beer={beer} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Not Sure What to Try Next?
              </h2>
              <p className="text-xl text-amber-100 max-w-xl">
                Use our comparison tool to find beers similar to ones you love,
                or discover new styles based on your taste preferences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/compare"
                className="px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors text-center"
              >
                Compare Beers
              </Link>
              <Link
                href="/quiz"
                className="px-8 py-4 bg-amber-600 text-white font-bold rounded-xl border-2 border-white hover:bg-amber-700 transition-colors text-center"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-medium mb-2">
                <BookOpen className="w-4 h-4" />
                LEARN
              </div>
              <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
                Beer Guides
              </h2>
            </div>
            <Link href="/guides" className="hidden sm:flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium">
              All Guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <div className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
                  <div className="h-40 relative overflow-hidden">
                    <Image
                      src={getGuideImage(guide.category, guide.slug)}
                      alt={guide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/30" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full mb-3">
                      {guide.category}
                    </span>
                    <h3 className="font-bold text-lg text-brown-800 dark:text-amber-100 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-brown-600 dark:text-brown-300 text-sm line-clamp-2">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-brown-400">
                      <span>{guide.read_time} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-brown-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-brown-300 mb-8">
            Get weekly beer recommendations, new brewery spotlights, and exclusive guides
            delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-brown-800 border border-brown-700 text-white placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-brown-500 mt-4">
            No spam, unsubscribe anytime. Must be 21+.
          </p>
        </div>
      </section>
    </div>
  );
}
