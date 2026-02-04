'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, X } from 'lucide-react';
import Logo from './Logo';
import MegaMenu from './MegaMenu';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/beers?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <div className="hidden lg:block">
            <MegaMenu />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search beers, breweries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 rounded-full bg-white dark:bg-brown-800 border border-amber-300 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="ml-2 p-2 rounded-full hover:bg-amber-100 dark:hover:bg-brown-800"
                >
                  <X className="w-5 h-5 text-brown-600 dark:text-amber-200" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-amber-100 dark:hover:bg-brown-800 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-brown-600 dark:text-amber-200" />
              </button>
            )}

            {/* Favorites */}
            <Link
              href="/favorites"
              className="hidden sm:flex p-2 rounded-full hover:bg-amber-100 dark:hover:bg-brown-800 transition-colors"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 text-brown-600 dark:text-amber-200" />
            </Link>

            {/* User */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <MegaMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Search bar for mobile (expanded) */}
      <div className="lg:hidden px-4 pb-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search beers, breweries, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-brown-800 border border-amber-200 dark:border-brown-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-brown-800 dark:text-amber-100 placeholder-brown-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400" />
          </div>
        </form>
      </div>
    </header>
  );
}
