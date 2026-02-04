'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Beer, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100">
              My Favorites
            </h1>
          </div>
          <p className="text-brown-600 dark:text-brown-300">
            Keep track of beers you love and want to try.
          </p>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-6 inline-block mb-6">
              <Heart className="w-16 h-16 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              No favorites yet
            </h2>
            <p className="text-brown-600 dark:text-brown-300 mb-8 max-w-md mx-auto">
              Start exploring beers and click the heart icon to save your favorites.
              Your selections will be saved here for easy access.
            </p>
            <Link
              href="/beers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              <Beer className="w-5 h-5" />
              Browse Beers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Sign Up CTA */}
        <div className="mt-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Create an Account to Save Favorites
          </h3>
          <p className="text-amber-100 mb-6 max-w-lg mx-auto">
            Sign up for a free account to save your favorite beers across devices,
            get personalized recommendations, and more.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
          >
            Sign Up Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
