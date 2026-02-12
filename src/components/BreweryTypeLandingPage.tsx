'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2, Globe, PieChart, Factory, Map, Layers, DollarSign, Users,
  TrendingUp, BarChart3, Beer, Calendar, Star, BookOpen, ArrowRight, Home,
  Sparkles,
} from 'lucide-react';
import type { BreweryTypeData } from '@/data/brewery-types';
import type { CuratedBrewery } from '@/data/curated-breweries';
import CuratedBreweryCard from '@/components/CuratedBreweryCard';
import BreweryTypeBrowse from '@/components/BreweryTypeBrowse';
import { getBreweryTypeHeroImage } from '@/lib/images';

// Map icon names from data to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  'globe': <Globe className="w-6 h-6" />,
  'pie-chart': <PieChart className="w-6 h-6" />,
  'factory': <Factory className="w-6 h-6" />,
  'map': <Map className="w-6 h-6" />,
  'layers': <Layers className="w-6 h-6" />,
  'dollar-sign': <DollarSign className="w-6 h-6" />,
  'building-2': <Building2 className="w-6 h-6" />,
  'users': <Users className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'bar-chart': <BarChart3 className="w-6 h-6" />,
  'beer': <Beer className="w-6 h-6" />,
  'calendar': <Calendar className="w-6 h-6" />,
};

// Map slug to hero icon
const heroIcons: Record<string, React.ReactNode> = {
  commercial: <Factory className="w-10 h-10 text-amber-400" />,
  craft: <Sparkles className="w-10 h-10 text-amber-400" />,
  micro: <Building2 className="w-10 h-10 text-amber-400" />,
  regional: <Building2 className="w-10 h-10 text-amber-400" />,
  homebrew: <Home className="w-10 h-10 text-amber-400" />,
};

interface BreweryTypeLandingPageProps {
  data: BreweryTypeData;
  curatedBreweries?: CuratedBrewery[];
}

export default function BreweryTypeLandingPage({ data, curatedBreweries = [] }: BreweryTypeLandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* ============================================ */}
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <section className="relative overflow-hidden">
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src={getBreweryTypeHeroImage(data.slug)}
            alt={`${data.name} - ${data.tagline}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-amber-200/70 mb-6">
            <Link href="/breweries" className="hover:text-amber-200 transition-colors">
              Breweries
            </Link>
            <span>/</span>
            <span className="text-amber-100">{data.name}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            {heroIcons[data.slug]}
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {data.name}
            </h1>
          </div>
          <p className="text-xl text-amber-200 font-medium mb-3">
            {data.tagline}
          </p>
          <p className="text-amber-100/80 max-w-3xl text-lg leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ============================================ */}
        {/* DEFINITION SECTION                           */}
        {/* ============================================ */}
        <section className="mb-12">
          <div className="bg-white dark:bg-brown-800 rounded-2xl border border-amber-200 dark:border-brown-700 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-neon-orange px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                {data.definitionTitle}
              </h2>
            </div>
            <div className="p-6 md:p-8">
              {data.definitionContent.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-brown-700 dark:text-brown-200 leading-relaxed mb-4 last:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brown-800 dark:text-amber-100">$1</strong>')
                      .replace(/^- /gm, '&bull; ')
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* STATS SECTION                                */}
        {/* ============================================ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-amber-500" />
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-3 text-amber-500">
                  {iconMap[stat.icon] || <BarChart3 className="w-6 h-6" />}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-neon-orange mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-brown-600 dark:text-brown-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* CURATED BREWERIES SECTION                    */}
        {/* ============================================ */}
        {curatedBreweries.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500" />
              Notable {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {curatedBreweries.map((brewery) => (
                <CuratedBreweryCard key={brewery.id} brewery={brewery} />
              ))}
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* BROWSE SECTION (API) or HOMEBREW CONTENT     */}
        {/* ============================================ */}
        {data.hasApiData ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-amber-500" />
              Browse {data.name}
            </h2>
            <p className="text-brown-600 dark:text-brown-300 mb-6">
              Search and explore {data.name.toLowerCase()} from around the world, powered by Open Brewery DB.
            </p>
            <Suspense fallback={
              <div className="text-center py-8">
                <div className="animate-pulse text-amber-600">Loading breweries...</div>
              </div>
            }>
              <BreweryTypeBrowse
                openBreweryDbTypes={data.openBreweryDbTypes}
                typeName={data.name}
              />
            </Suspense>
          </section>
        ) : (
          /* Homebrew special content */
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
              <Beer className="w-6 h-6 text-amber-500" />
              Get Started Homebrewing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Getting started card */}
              <Link
                href="/beer-fyi/home-brewing-getting-started"
                className="group bg-white dark:bg-brown-800 rounded-2xl border border-amber-200 dark:border-brown-700 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-r from-neon-rust to-neon-orange p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Home Brewing 101
                  </h3>
                  <p className="text-amber-100">
                    Everything you need to get started brewing beer at home. From equipment to your first batch.
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold text-lg">1.</span>
                      <p className="text-brown-700 dark:text-brown-200">Get a starter kit ($75-$150)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold text-lg">2.</span>
                      <p className="text-brown-700 dark:text-brown-200">Sanitize everything thoroughly</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold text-lg">3.</span>
                      <p className="text-brown-700 dark:text-brown-200">Start with an extract recipe</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold text-lg">4.</span>
                      <p className="text-brown-700 dark:text-brown-200">Ferment, bottle, and enjoy!</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium group-hover:gap-3 transition-all">
                    <BookOpen className="w-4 h-4" />
                    Read the Full Guide
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Book ad */}
              <div className="bg-white dark:bg-brown-800 rounded-2xl border border-amber-200 dark:border-brown-700 overflow-hidden">
                <div className="bg-gradient-to-r from-neon-orange to-neon-rust p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    📖 Recommended Reading
                  </h3>
                  <p className="text-amber-100">
                    Take your homebrewing to the next level with this beginner-friendly guide.
                  </p>
                </div>
                <div className="p-6 text-center">
                  <Image
                    src="/everythingbeer/images/homebrewing-simplified.png"
                    alt="Homebrewing Simplified - A Beginner's Guide to Making Your Own Beer by Bryan Siemon"
                    width={200}
                    height={280}
                    className="mx-auto mb-4 rounded-lg shadow-md"
                  />
                  <h4 className="font-bold text-brown-800 dark:text-stone-100 text-lg mb-1">
                    Homebrewing Simplified
                  </h4>
                  <p className="text-sm text-brown-500 dark:text-stone-400 mb-2">
                    A Beginner&apos;s Guide To Making Your Own Beer!
                  </p>
                  <p className="text-xs text-brown-400 dark:text-dark-muted">
                    By Bryan Siemon
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* RELATED ARTICLES SECTION                     */}
        {/* ============================================ */}
        {data.relatedArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-500" />
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/beer-fyi/${article.slug}`}
                  className="group bg-white dark:bg-brown-800 rounded-xl border border-amber-200 dark:border-brown-700 p-5 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-600 transition-all"
                >
                  <h3 className="font-semibold text-brown-800 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 font-medium">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to all breweries */}
        <div className="border-t border-amber-200 dark:border-brown-700 pt-6">
          <Link
            href="/breweries"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors"
          >
            ← Back to All Breweries
          </Link>
        </div>
      </div>
    </div>
  );
}
