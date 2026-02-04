'use client';

import { use } from 'react';
import Link from 'next/link';
import { Layers, Beer, Flame, Droplets, ArrowLeft } from 'lucide-react';
import { getStyleById, styles } from '@/data/styles';
import { getBeersByStyle } from '@/data/beers';
import BeerCard from '@/components/BeerCard';
import StyleCard from '@/components/StyleCard';

interface StyleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StyleDetailPage({ params }: StyleDetailPageProps) {
  const { id } = use(params);
  const style = getStyleById(id);

  if (!style) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Layers className="w-20 h-20 text-brown-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            Style Not Found
          </h1>
          <p className="text-brown-600 dark:text-brown-300 mb-8">
            We couldn't find the beer style you're looking for.
          </p>
          <Link
            href="/styles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Styles
          </Link>
        </div>
      </div>
    );
  }

  const beersInStyle = getBeersByStyle(id);
  const relatedStyles = styles
    .filter((s) => s.id !== id && s.category === style.category)
    .slice(0, 4);

  const getSrmGradient = (min: number | null, max: number | null) => {
    const colors = [
      '#fef3c7', '#fcd34d', '#fbbf24', '#f59e0b',
      '#d97706', '#b45309', '#92400e', '#78350f',
      '#451a03', '#1c1917'
    ];

    const minIdx = min ? Math.min(Math.floor(min / 4), 9) : 2;
    const maxIdx = max ? Math.min(Math.floor(max / 4), 9) : 4;

    return `linear-gradient(135deg, ${colors[minIdx]}, ${colors[maxIdx]})`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-amber-50 dark:bg-brown-900 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/styles" className="text-amber-600 hover:text-amber-700">
              Styles
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-600 dark:text-brown-300">{style.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 mb-8">
          {/* Color band */}
          <div
            className="h-32 relative"
            style={{ background: getSrmGradient(style.srm_min, style.srm_max) }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Beer className="w-16 h-16 text-white/40" />
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/20 text-white font-mono text-sm rounded-full">
                {style.code}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium">
                {style.category}
              </span>
              <span className="text-brown-500 dark:text-brown-400 text-sm">
                {style.system}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              {style.name}
            </h1>

            <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed mb-8">
              {style.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(style.abv_min !== null || style.abv_max !== null) && (
                <div className="bg-amber-50 dark:bg-brown-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <Beer className="w-5 h-5" />
                    <span className="text-sm font-medium">ABV</span>
                  </div>
                  <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                    {style.abv_min ?? '?'} - {style.abv_max ?? '?'}%
                  </div>
                </div>
              )}

              {(style.ibu_min !== null || style.ibu_max !== null) && (
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Flame className="w-5 h-5" />
                    <span className="text-sm font-medium">IBU</span>
                  </div>
                  <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                    {style.ibu_min ?? '?'} - {style.ibu_max ?? '?'}
                  </div>
                </div>
              )}

              {(style.srm_min !== null || style.srm_max !== null) && (
                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="text-sm font-medium">SRM</span>
                  </div>
                  <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                    {style.srm_min ?? '?'} - {style.srm_max ?? '?'}
                  </div>
                </div>
              )}

              {(style.og_min !== null || style.og_max !== null) && (
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <span className="text-sm font-medium">OG</span>
                  </div>
                  <div className="text-2xl font-bold text-brown-800 dark:text-amber-100">
                    {style.og_min?.toFixed(3) ?? '?'} - {style.og_max?.toFixed(3) ?? '?'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Beers in this Style */}
        {beersInStyle.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Beers in this Style
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {beersInStyle.map((beer) => (
                <BeerCard key={beer.id} beer={beer} />
              ))}
            </div>
          </div>
        )}

        {/* Related Styles */}
        {relatedStyles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Related {style.category} Styles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedStyles.map((relatedStyle) => (
                <StyleCard key={relatedStyle.id} style={relatedStyle} />
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/styles"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Styles
          </Link>
        </div>
      </div>
    </div>
  );
}
