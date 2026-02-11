'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Globe, Building2, Phone } from 'lucide-react';
import type { Brewery } from '@/types';
import { getBreweryImage, getBreweryImageAlt } from '@/lib/images';

interface BreweryCardProps {
  brewery: Brewery;
}

const breweryTypeLabels: Record<string, string> = {
  micro: 'Microbrewery',
  nano: 'Nanobrewery',
  regional: 'Regional Brewery',
  brewpub: 'Brewpub',
  large: 'Large Brewery',
  planning: 'Planning',
  bar: 'Bar',
  contract: 'Contract',
  proprietor: 'Proprietor',
  closed: 'Closed',
};

const breweryTypeColors: Record<string, string> = {
  micro: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  nano: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  regional: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  brewpub: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  large: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
  planning: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  bar: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
  contract: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  proprietor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  closed: 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
};

export default function BreweryCard({ brewery }: BreweryCardProps) {
  return (
    <Link href={`/breweries/${brewery.id}`}>
      <div className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
        {/* Header with image */}
        <div className="relative h-36 overflow-hidden">
          <Image
            src={getBreweryImage(brewery.id, brewery.brewery_type)}
            alt={getBreweryImageAlt(brewery.name, brewery.city, brewery.state_province || brewery.state, brewery.country)}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-white/30" />
          </div>

          {/* Brewery type badge */}
          {brewery.brewery_type && (
            <span className={`absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold rounded-full shadow-lg ${
              breweryTypeColors[brewery.brewery_type] || 'bg-gray-100 text-gray-700'
            }`}>
              {breweryTypeLabels[brewery.brewery_type] || brewery.brewery_type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-brown-800 dark:text-amber-100 line-clamp-1">
            {brewery.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 mt-2 text-sm text-brown-500 dark:text-brown-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {[brewery.city, brewery.state_province || brewery.state, brewery.country]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>

          {/* Website */}
          {brewery.website_url && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Globe className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="text-amber-600 dark:text-amber-400 truncate hover:underline">
                {brewery.website_url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              </span>
            </div>
          )}

          {/* Phone */}
          {brewery.phone && (
            <div className="flex items-center gap-2 mt-2 text-sm text-brown-500 dark:text-brown-400">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{brewery.phone}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
