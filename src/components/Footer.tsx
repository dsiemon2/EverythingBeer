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
    <footer className="bg-brown-900 text-amber-100">
      {/* Newsletter section */}
      <div className="border-b border-brown-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-brown-300">
                Get weekly beer recommendations, guides, and industry news.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-brown-800 border border-brown-600 text-white placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
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
            <Logo showText={false} />
            <p className="mt-4 text-brown-300 text-sm leading-relaxed">
              Your one-stop destination to discover, compare, and understand beer.
              From craft to commercial, we've got you covered.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-brown-400 hover:text-amber-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-brown-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-brown-400 hover:text-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-brown-400 hover:text-amber-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brown-300 hover:text-amber-500 transition-colors text-sm"
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
      <div className="border-t border-brown-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brown-400">
            <p>
              &copy; {new Date().getFullYear()} EverythingBeer. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-amber-500">&#9829;</span> for beer lovers everywhere
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
