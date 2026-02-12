'use client';

import Image from 'next/image';
import { MapPin, Star, Globe } from 'lucide-react';
import { getBreweryImage, getBreweryImageAlt } from '@/lib/images';
import type { CuratedBrewery } from '@/data/curated-breweries';

interface CuratedBreweryCardProps {
  brewery: CuratedBrewery;
}

export default function CuratedBreweryCard({ brewery }: CuratedBreweryCardProps) {
  return (
    <div className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border-2 border-amber-300 dark:border-amber-600 h-full hover:shadow-lg hover:shadow-amber-200/30 dark:hover:shadow-amber-900/20 transition-all duration-300">
      {/* Header with image */}
      <div className="relative h-36 overflow-hidden">
        <Image
          src={getBreweryImage(brewery.id, brewery.brewery_type)}
          alt={getBreweryImageAlt(brewery.name, brewery.city, brewery.state, brewery.country)}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Featured badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500 text-white shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3" /> Featured
        </span>

        {/* Brewery type badge */}
        <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full bg-white/90 text-brown-700 shadow-lg">
          Est. {brewery.founded}
        </span>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-lg text-white line-clamp-1 drop-shadow-lg">
            {brewery.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-brown-600 dark:text-brown-300 line-clamp-3 mb-3">
          {brewery.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-brown-500 dark:text-brown-400">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">
            {[brewery.city, brewery.state, brewery.country]
              .filter(Boolean)
              .join(', ')}
          </span>
        </div>

        {/* Flagship beer */}
        {brewery.flagship_beer && (
          <div className="flex items-center gap-2 mt-2 text-sm text-amber-600 dark:text-amber-400">
            <Star className="w-4 h-4 flex-shrink-0" />
            <span>Flagship: {brewery.flagship_beer}</span>
          </div>
        )}

        {/* Website */}
        {brewery.website_url && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Globe className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 truncate hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {brewery.website_url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
