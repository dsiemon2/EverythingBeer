'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Droplets, Flame, Beer } from 'lucide-react';
import type { Beer as BeerType } from '@/types';
import { getBeerImageUrl } from '@/lib/images';

interface BeerCardProps {
  beer: BeerType;
  showBrewery?: boolean;
}

const tagIcons: Record<string, React.ReactNode> = {
  hoppy: <Flame className="w-3 h-3" />,
  malty: <Droplets className="w-3 h-3" />,
  crisp: <Star className="w-3 h-3" />,
};

const tagColors: Record<string, string> = {
  hoppy: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  malty: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  crisp: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  roasty: 'bg-brown-200 text-brown-700 dark:bg-brown-800 dark:text-brown-300',
  sour: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  fruity: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

export default function BeerCard({ beer, showBrewery = true }: BeerCardProps) {
  const imageUrl = getBeerImageUrl(beer.id, beer.style_id);

  return (
    <Link href={`/beers/${beer.id}`}>
      <div className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
        {/* Beer Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={beer.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {beer.is_craft && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full shadow-lg">
                Craft
              </span>
            )}
            {beer.availability === 'limited' && (
              <span className="px-2 py-0.5 text-xs font-semibold bg-purple-500 text-white rounded-full shadow-lg">
                Limited
              </span>
            )}
          </div>

          {/* ABV badge on image */}
          {beer.abv && (
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
              <span className="text-white font-bold text-sm">{beer.abv}%</span>
              <span className="text-white/70 text-xs ml-1">ABV</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-brown-800 dark:text-amber-100 line-clamp-1">
            {beer.name}
          </h3>

          {showBrewery && (
            <p className="text-sm text-brown-500 dark:text-brown-400 mt-0.5">
              {beer.brewery_name}
            </p>
          )}

          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
            {beer.style_name}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3 text-sm">
            {beer.ibu && (
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-brown-700 dark:text-amber-200">
                  {beer.ibu}
                </span>
                <span className="text-brown-400 text-xs">IBU</span>
              </div>
            )}
            {beer.srm && (
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-orange-600" />
                <span className="font-semibold text-brown-700 dark:text-amber-200">
                  {beer.srm}
                </span>
                <span className="text-brown-400 text-xs">SRM</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {beer.tags && beer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {beer.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                    tagColors[tag] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  {tagIcons[tag]}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
