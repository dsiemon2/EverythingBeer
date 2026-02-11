'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, MapPin, Globe, Phone, ArrowLeft, ExternalLink, Navigation, Map } from 'lucide-react';
import type { Brewery } from '@/types';
import { getBreweryImage, getBreweryImageAlt } from '@/lib/images';

interface BreweryDetailPageProps {
  params: Promise<{ id: string }>;
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

export default function BreweryDetailPage({ params }: BreweryDetailPageProps) {
  const { id } = use(params);
  const [brewery, setBrewery] = useState<Brewery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBrewery() {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        if (!response.ok) throw new Error('Brewery not found');
        const data = await response.json();
        setBrewery(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchBrewery();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mx-auto mb-4" />
          <p className="text-brown-600 dark:text-brown-300">Loading brewery...</p>
        </div>
      </div>
    );
  }

  if (error || !brewery) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Building2 className="w-20 h-20 text-brown-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            Brewery Not Found
          </h1>
          <p className="text-brown-600 dark:text-brown-300 mb-8">
            We couldn't find the brewery you're looking for.
          </p>
          <Link
            href="/breweries"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Breweries
          </Link>
        </div>
      </div>
    );
  }

  const fullAddress = [
    brewery.address_1 || brewery.street,
    brewery.city,
    brewery.state_province || brewery.state,
    brewery.postal_code,
    brewery.country,
  ]
    .filter(Boolean)
    .join(', ');

  const mapsUrl = brewery.latitude && brewery.longitude
    ? `https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-amber-50 dark:bg-brown-900 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/breweries" className="text-amber-600 hover:text-amber-700">
              Breweries
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-600 dark:text-brown-300">{brewery.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Card */}
        <div className="bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700">
          {/* Header */}
          <div className="h-48 relative overflow-hidden">
            <Image
              src={getBreweryImage(brewery.id, brewery.brewery_type)}
              alt={getBreweryImageAlt(brewery.name, brewery.city, brewery.state_province || brewery.state, brewery.country)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="w-24 h-24 text-white/30" />
            </div>

            {brewery.brewery_type && (
              <span className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold bg-black/30 backdrop-blur-sm text-white rounded-full">
                {breweryTypeLabels[brewery.brewery_type] || brewery.brewery_type}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              {brewery.name}
            </h1>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-brown-700 rounded-xl">
                <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-brown-800 dark:text-amber-100 mb-1">
                    Location
                  </h3>
                  <p className="text-brown-600 dark:text-brown-300">
                    {fullAddress}
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Website */}
              {brewery.website_url && (
                <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-brown-700 rounded-xl">
                  <Globe className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-brown-800 dark:text-amber-100 mb-1">
                      Website
                    </h3>
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
                    >
                      {brewery.website_url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Phone */}
              {brewery.phone && (
                <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-brown-700 rounded-xl">
                  <Phone className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-brown-800 dark:text-amber-100 mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${brewery.phone}`}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      {brewery.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Map Embed */}
              {brewery.latitude && brewery.longitude && (
                <div className="rounded-xl overflow-hidden border border-amber-200 dark:border-brown-600">
                  <iframe
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(String(brewery.longitude)) - 0.01}%2C${parseFloat(String(brewery.latitude)) - 0.01}%2C${parseFloat(String(brewery.longitude)) + 0.01}%2C${parseFloat(String(brewery.latitude)) + 0.01}&layer=mapnik&marker=${brewery.latitude}%2C${brewery.longitude}`}
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Map className="w-4 h-4" />
                View on Map
              </a>
              {brewery.website_url && (
                <a
                  href={brewery.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-amber-300 dark:border-brown-600 text-amber-600 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-brown-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link
            href="/breweries"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Breweries
          </Link>
        </div>
      </div>
    </div>
  );
}
