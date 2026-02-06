'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CircleUserRound, X, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import ThemeToggle from './ThemeToggle';

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
      {/* Top Toolbar */}
      <div className="bg-dark-base text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            {/* Social Media Icons - Left */}
            <div className="flex items-center gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-blue transition-colors" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-red transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-orange transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-blue transition-colors" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Search, Theme, Account - Right */}
            <div className="flex items-center gap-1">
              {/* Search */}
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search beers, breweries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-56 pl-8 pr-3 py-1 text-sm rounded-full bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-neon-orange text-stone-200 placeholder-dark-muted"
                      autoFocus
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-muted" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="ml-1 p-1 rounded-full hover:bg-dark-elevated transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-dark-muted" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 rounded-full hover:bg-dark-elevated transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5 text-dark-muted hover:text-neon-orange" />
                </button>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Account */}
              <Link
                href="/login"
                className="p-1.5 rounded-full hover:bg-dark-elevated transition-colors"
                aria-label="Account"
              >
                <CircleUserRound className="w-3.5 h-3.5 text-dark-muted hover:text-neon-orange" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Logo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-3">
          <Logo size="lg" />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-amber-200/30 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12">
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <MegaMenu />
            </div>

            {/* Mobile: hamburger */}
            <div className="lg:hidden">
              <MegaMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Search bar for mobile (expanded) */}
      <div className="lg:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search beers, breweries, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-dark-elevated border border-amber-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-neon-orange text-brown-800 dark:text-stone-200 placeholder-brown-400 dark:placeholder-dark-muted"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 dark:text-dark-muted" />
          </div>
        </form>
      </div>
    </header>
  );
}
