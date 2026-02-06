import Link from 'next/link';
import Logo from './Logo';
import { Mail, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  discover: {
    title: 'Discover',
    links: [
      { href: '/beers', label: 'All Beers' },
      { href: '/breweries', label: 'Breweries' },
      { href: '/styles', label: 'Beer Styles' },
      { href: '/compare', label: 'Compare Beers' },
      { href: '/guides', label: 'Guides & Articles' },
      { href: '/beer-fyi', label: 'Beer FYI' },
      { href: '/pint-sized-posts', label: 'Pint-Sized Posts' },
    ],
  },
  styles: {
    title: 'Popular Styles',
    links: [
      { href: '/styles/american-ipa', label: 'IPA' },
      { href: '/styles/american-lager', label: 'Lager' },
      { href: '/styles/irish-stout', label: 'Stout' },
      { href: '/styles/czech-pilsner', label: 'Pilsner' },
      { href: '/styles/hefeweizen', label: 'Wheat Beer' },
    ],
  },
  tools: {
    title: 'Tools',
    links: [
      { href: '/compare', label: 'Beer Comparison' },
      { href: '/quiz', label: 'Taste Quiz' },
      { href: '/favorites', label: 'My Favorites' },
      { href: '/login', label: 'Sign In' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/guides', label: 'Our Guides' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-dark-base text-stone-300">
      {/* Neon top accent */}
      <div className="neon-divider" />

      {/* Newsletter section */}
      <div className="border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-stone-400">
                Get weekly beer recommendations, guides, and industry news.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-dark-elevated border border-dark-border text-stone-200 placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-neon-orange"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-neon-red to-neon-orange hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-stone-500 text-sm leading-relaxed">
              Your one-stop destination to discover, compare, and understand beer.
              From craft to commercial, we&apos;ve got you covered.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-neon-red transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-neon-orange mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-neon-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-dark-muted">
            <p>
              &copy; {new Date().getFullYear()} EverythingBeer. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-neon-red">&#9829;</span> for beer lovers everywhere
            </p>
            <p className="text-xs">
              Please drink responsibly. Must be 21+ to use this site.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
