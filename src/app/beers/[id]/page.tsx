'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Beer as BeerIcon, Building2, ArrowLeft, Droplets, Flame, Star, ExternalLink, Heart } from 'lucide-react';
import { getBeerById, beers } from '@/data/beers';
import { getStyleById } from '@/data/styles';
import { getBeerImageUrl } from '@/lib/images';
import BeerCard from '@/components/BeerCard';

interface BeerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BeerDetailPage({ params }: BeerDetailPageProps) {
  const { id } = use(params);
  const beer = getBeerById(id);

  if (!beer) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BeerIcon className="w-20 h-20 text-brown-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            Beer Not Found
          </h1>
          <p className="text-brown-600 dark:text-brown-300 mb-8">
            We couldn't find the beer you're looking for.
          </p>
          <Link
            href="/beers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beers
          </Link>
        </div>
      </div>
    );
  }

  const style = getStyleById(beer.style_id);
  const similarBeers = beers
    .filter((b) => b.id !== beer.id && (b.style_id === beer.style_id || b.tags.some((t) => beer.tags.includes(t))))
    .slice(0, 4);

  const getSrmColor = (srm: number | null) => {
    if (srm === null) return '#f59e0b';
    if (srm <= 4) return '#fef3c7';
    if (srm <= 8) return '#fcd34d';
    if (srm <= 12) return '#f59e0b';
    if (srm <= 18) return '#d97706';
    if (srm <= 24) return '#92400e';
    if (srm <= 30) return '#78350f';
    return '#1c1917';
  };

  const tagColors: Record<string, string> = {
    hoppy: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    malty: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    crisp: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    roasty: 'bg-brown-200 text-brown-700 dark:bg-brown-800 dark:text-brown-300',
    sour: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    fruity: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    citrus: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    spicy: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    coffee: 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
    bourbon: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    hazy: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    balanced: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
    piney: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    creamy: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    smooth: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    light: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300',
    refreshing: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-amber-50 dark:bg-brown-900 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/beers" className="text-amber-600 hover:text-amber-700">
              Beers
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-600 dark:text-brown-300">{beer.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Card */}
            <div className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 mb-8">
              {/* Beer Image */}
              <div className="h-72 relative overflow-hidden">
                <Image
                  src={getBeerImageUrl(beer.id, beer.style_id)}
                  alt={beer.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />


                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {beer.is_craft && (
                    <span className="px-3 py-1 text-sm font-semibold bg-amber-500 text-white rounded-full">
                      Craft
                    </span>
                  )}
                  {beer.availability === 'limited' && (
                    <span className="px-3 py-1 text-sm font-semibold bg-purple-500 text-white rounded-full">
                      Limited Release
                    </span>
                  )}
                </div>
              </div>

              {/* Beer Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-2">
                      {beer.name}
                    </h1>
                    <Link
                      href={`/breweries/${beer.brewery_id}`}
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                    >
                      <Building2 className="w-4 h-4" />
                      {beer.brewery_name}
                    </Link>
                  </div>
                  <button className="p-3 rounded-full bg-amber-100 dark:bg-brown-700 hover:bg-amber-200 dark:hover:bg-brown-600 transition-colors">
                    <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </button>
                </div>

                <Link
                  href={`/styles/${beer.style_id}`}
                  className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4 hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
                >
                  {beer.style_name}
                </Link>

                {beer.description && (
                  <p className="text-brown-600 dark:text-brown-300 leading-relaxed mb-6">
                    {beer.description}
                  </p>
                )}

                {/* Tags */}
                {beer.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {beer.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          tagColors[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {beer.abv && (
                    <div className="bg-amber-50 dark:bg-brown-700 rounded-xl p-4 text-center">
                      <BeerIcon className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                        {beer.abv}%
                      </div>
                      <div className="text-sm text-brown-500 dark:text-brown-400">ABV</div>
                    </div>
                  )}
                  {beer.ibu && (
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
                      <Flame className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                        {beer.ibu}
                      </div>
                      <div className="text-sm text-brown-500 dark:text-brown-400">IBU</div>
                    </div>
                  )}
                  {beer.srm && (
                    <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 text-center">
                      <Droplets className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                        {beer.srm}
                      </div>
                      <div className="text-sm text-brown-500 dark:text-brown-400">SRM</div>
                    </div>
                  )}
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                    <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                      {beer.availability || 'Year-round'}
                    </div>
                    <div className="text-sm text-brown-500 dark:text-brown-400">Availability</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Beers */}
            {similarBeers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
                  Similar Beers You Might Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {similarBeers.map((b) => (
                    <BeerCard key={b.id} beer={b} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-brown-800 rounded-2xl p-6 border border-amber-100 dark:border-brown-700">
              <h3 className="font-bold text-brown-800 dark:text-amber-100 mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  Add to Favorites
                </button>
                <Link
                  href={`/compare?a=${beer.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-amber-300 dark:border-brown-600 text-amber-600 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-brown-700 transition-colors"
                >
                  Compare This Beer
                </Link>
              </div>
            </div>

            {/* Style Info */}
            {style && (
              <div className="bg-white dark:bg-brown-800 rounded-2xl p-6 border border-amber-100 dark:border-brown-700">
                <h3 className="font-bold text-brown-800 dark:text-amber-100 mb-4">
                  About {style.name}
                </h3>
                <p className="text-brown-600 dark:text-brown-300 text-sm leading-relaxed mb-4">
                  {style.description}
                </p>
                <Link
                  href={`/styles/${style.id}`}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  Learn more about this style
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Country Origin */}
            <div className="bg-white dark:bg-brown-800 rounded-2xl p-6 border border-amber-100 dark:border-brown-700">
              <h3 className="font-bold text-brown-800 dark:text-amber-100 mb-4">
                Origin
              </h3>
              <p className="text-brown-600 dark:text-brown-300">
                {beer.country_of_origin}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
