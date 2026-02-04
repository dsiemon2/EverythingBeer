'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Beer, Droplets, Flame } from 'lucide-react';
import type { Style } from '@/types';
import { getStyleImage } from '@/lib/images';

interface StyleCardProps {
  style: Style;
}

export default function StyleCard({ style }: StyleCardProps) {
  return (
    <Link href={`/styles/${style.id}`}>
      <div className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
        {/* Image header */}
        <div className="h-32 relative overflow-hidden">
          <Image
            src={getStyleImage(style.category, style.id)}
            alt={style.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Beer className="w-10 h-10 text-white/30" />
          </div>

          {/* Code badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs font-mono text-white">
            {style.code}
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-amber-500 rounded-full text-xs font-semibold text-white">
            {style.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-brown-800 dark:text-amber-100">
            {style.name}
          </h3>

          <p className="text-sm text-brown-600 dark:text-brown-300 mt-2 line-clamp-2">
            {style.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            {(style.abv_min || style.abv_max) && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/50 rounded">
                  <Beer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-brown-400">ABV</div>
                  <div className="font-semibold text-brown-700 dark:text-amber-200">
                    {style.abv_min || '?'}-{style.abv_max || '?'}%
                  </div>
                </div>
              </div>
            )}

            {(style.ibu_min || style.ibu_max) && (
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/50 rounded">
                  <Flame className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-brown-400">IBU</div>
                  <div className="font-semibold text-brown-700 dark:text-amber-200">
                    {style.ibu_min || '?'}-{style.ibu_max || '?'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
