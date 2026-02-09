'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Beer,
  Building2,
  Layers,
  GitCompare,
  BookOpen,
  MapPin,
  ChevronDown,
  Search,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
  Leaf,
  Flame,
  Droplets,
  Star,
  Newspaper,
  Lightbulb,
  Pen,
  Home
} from 'lucide-react';

interface MenuSection {
  title: string;
  links: {
    href: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    badge?: string;
  }[];
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  megaMenu?: MenuSection[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Beers',
    href: '/beers',
    icon: <Beer className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Browse Beers',
        links: [
          { href: '/beers', label: 'All Beers', description: 'Explore our complete database', icon: <Beer className="w-4 h-4" /> },
          { href: '/beers?filter=craft', label: 'Craft Beers', description: 'Artisanal & independent', icon: <Sparkles className="w-4 h-4" /> },
          { href: '/beers?filter=commercial', label: 'Commercial Beers', description: 'Popular mainstream options', icon: <Building2 className="w-4 h-4" /> },
          { href: '/beers?filter=trending', label: 'Trending Now', description: 'Most searched this week', icon: <TrendingUp className="w-4 h-4" />, badge: 'Hot' },
        ],
      },
      {
        title: 'By Flavor Profile',
        links: [
          { href: '/beers?tag=hoppy', label: 'Hoppy', description: 'Bold & bitter', icon: <Leaf className="w-4 h-4" /> },
          { href: '/beers?tag=malty', label: 'Malty', description: 'Sweet & rich', icon: <Flame className="w-4 h-4" /> },
          { href: '/beers?tag=crisp', label: 'Crisp', description: 'Clean & refreshing', icon: <Droplets className="w-4 h-4" /> },
          { href: '/beers?tag=roasty', label: 'Roasty', description: 'Dark & toasty', icon: <Star className="w-4 h-4" /> },
        ],
      },
      {
        title: 'By Region',
        links: [
          { href: '/beers?country=usa', label: 'American', description: 'USA craft & macro' },
          { href: '/beers?country=germany', label: 'German', description: 'Traditional lagers & weizens' },
          { href: '/beers?country=belgium', label: 'Belgian', description: 'Trappist & abbey ales' },
          { href: '/beers?country=uk', label: 'British', description: 'Ales, stouts & porters' },
        ],
      },
    ],
  },
  {
    label: 'Breweries',
    href: '/breweries',
    icon: <Building2 className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Discover Breweries',
        links: [
          { href: '/breweries', label: 'All Breweries', description: 'Complete brewery directory', icon: <Building2 className="w-4 h-4" /> },
          { href: '/breweries?filter=commercial', label: 'Commercial Breweries', description: 'Major producers', icon: <Globe className="w-4 h-4" /> },
          { href: '/breweries?filter=craft', label: 'Craft Breweries', description: 'Independent & artisanal', icon: <Sparkles className="w-4 h-4" /> },
          { href: '/breweries?type=micro', label: 'Microbreweries', description: 'Small batch producers', icon: <Star className="w-4 h-4" /> },
        ],
      },
      {
        title: 'By Type',
        links: [
          { href: '/breweries?type=brewpub', label: 'Brewpubs', description: 'Brew & dine experiences', icon: <Beer className="w-4 h-4" /> },
          { href: '/breweries?type=regional', label: 'Regional Breweries', description: 'Large craft producers', icon: <MapPin className="w-4 h-4" /> },
        ],
      },
      {
        title: 'Explore',
        links: [
          { href: '/breweries?sort=name', label: 'Browse A-Z', description: 'Alphabetical listing', icon: <Award className="w-4 h-4" /> },
          { href: '/breweries', label: 'Search Breweries', description: 'Find any brewery', icon: <Search className="w-4 h-4" /> },
        ],
      },
    ],
  },
  {
    label: 'Styles',
    href: '/styles',
    icon: <Layers className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Popular Styles',
        links: [
          { href: '/styles/american-ipa', label: 'IPA', description: 'India Pale Ales' },
          { href: '/styles/american-lager', label: 'Lager', description: 'Crisp & clean' },
          { href: '/styles/irish-stout', label: 'Stout', description: 'Dark & roasty' },
          { href: '/styles/hefeweizen', label: 'Wheat Beer', description: 'Light & refreshing' },
        ],
      },
      {
        title: 'Ale Styles',
        links: [
          { href: '/styles/pale-ale', label: 'Pale Ale', description: 'Balanced & hoppy' },
          { href: '/styles/american-porter', label: 'Porter', description: 'Dark & malty' },
          { href: '/styles/belgian-tripel', label: 'Belgian Ale', description: 'Complex & fruity' },
          { href: '/styles/berliner-weisse', label: 'Sour Ale', description: 'Tart & funky' },
        ],
      },
      {
        title: 'Lager Styles',
        links: [
          { href: '/styles/czech-pilsner', label: 'Pilsner', description: 'Crisp & hoppy' },
          { href: '/styles/vienna-lager', label: 'Vienna Lager', description: 'Amber & toasty' },
          { href: '/styles/german-pilsner', label: 'German Pils', description: 'Dry & bitter' },
          { href: '/styles', label: 'View All Styles', description: '25+ beer styles', badge: 'Full Guide' },
        ],
      },
    ],
  },
  {
    label: 'Compare',
    href: '/compare',
    icon: <GitCompare className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Popular Comparisons',
        links: [
          { href: '/compare?a=bud-light&b=miller-lite', label: 'Bud Light vs Miller Lite', description: 'The classic showdown' },
          { href: '/compare?a=guinness-draught&b=samuel-adams-boston-lager', label: 'Guinness vs Sam Adams', description: 'Classic stout vs lager' },
          { href: '/compare?a=corona-extra&b=modelo-especial', label: 'Corona vs Modelo', description: 'Mexican lager face-off' },
          { href: '/compare?a=heineken&b=stella-artois', label: 'Heineken vs Stella Artois', description: 'Euro lager clash' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { href: '/compare', label: 'Compare Any Beers', description: 'Side-by-side analysis', icon: <GitCompare className="w-4 h-4" /> },
          { href: '/quiz', label: 'Taste Quiz', description: 'Discover your style', icon: <Star className="w-4 h-4" />, badge: 'Fun' },
        ],
      },
    ],
  },
  {
    label: 'Guides',
    href: '/guides',
    icon: <BookOpen className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Learn',
        links: [
          { href: '/guides/best-beers-for-beginners', label: 'Beginner\'s Guide', description: 'Start your beer journey' },
          { href: '/guides/beer-styles-explained', label: 'Styles Explained', description: 'IPA vs Pale Ale & more' },
          { href: '/guides/understanding-abv-ibu-srm', label: 'Reading Beer Labels', description: 'ABV, IBU & SRM decoded' },
          { href: '/guides', label: 'All Guides', description: 'View complete guide library' },
        ],
      },
      {
        title: 'Food Pairing',
        links: [
          { href: '/guides/beer-and-pizza-pairing', label: 'Beer & Pizza', description: 'Perfect combinations' },
          { href: '/guides?category=pairing', label: 'All Pairing Guides', description: 'Complete collection' },
        ],
      },
      {
        title: 'Seasonal & More',
        links: [
          { href: '/guides/summer-beers-guide', label: 'Summer Beers', description: 'Beat the heat' },
          { href: '/guides/domestic-lagers-compared', label: 'Lagers Compared', description: 'Taste, calories & ABV' },
          { href: '/guides', label: 'All Guides', description: 'View all articles' },
        ],
      },
    ],
  },
  {
    label: 'Beer FYI',
    href: '/beer-fyi',
    icon: <Newspaper className="w-4 h-4" />,
    megaMenu: [
      {
        title: 'Latest Articles',
        links: [
          { href: '/beer-fyi/rise-of-craft-lagers', label: 'Craft Lagers Rising', description: 'Industry trends', icon: <TrendingUp className="w-4 h-4" /> },
          { href: '/beer-fyi/home-brewing-getting-started', label: 'Home Brewing 101', description: 'Getting started guide', icon: <Pen className="w-4 h-4" /> },
          { href: '/beer-fyi/best-beer-festivals-2025', label: 'Beer Festivals 2025', description: 'Events worth attending', icon: <Star className="w-4 h-4" /> },
          { href: '/beer-fyi', label: 'All Articles', description: 'Browse all posts', icon: <Newspaper className="w-4 h-4" /> },
        ],
      },
      {
        title: 'Categories',
        links: [
          { href: '/beer-fyi?category=reviews', label: 'Reviews', description: 'Beer reviews & comparisons' },
          { href: '/beer-fyi?category=culture', label: 'Culture', description: 'Beer culture & lifestyle' },
          { href: '/beer-fyi?category=industry', label: 'Industry', description: 'Trends & news' },
          { href: '/beer-fyi?category=events', label: 'Events', description: 'Festivals & happenings' },
        ],
      },
      {
        title: 'Quick Reads',
        links: [
          { href: '/pint-sized-posts', label: 'Pint-Sized Posts', description: 'Quick beer facts', icon: <Lightbulb className="w-4 h-4" />, badge: 'Fun' },
        ],
      },
    ],
  },
];

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={menuRef} className="relative">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-dark-elevated"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop menu */}
      <ul className="hidden lg:flex items-center gap-1">
        {/* Home icon */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-brown-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-dark-elevated transition-colors font-medium"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => item.megaMenu && handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-brown-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-dark-elevated transition-colors font-medium"
            >
              {item.icon}
              {item.label}
              {item.megaMenu && (
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.label ? 'rotate-180' : ''}`} />
              )}
            </Link>

            {/* Mega menu dropdown */}
            {item.megaMenu && activeMenu === item.label && (
              <div className="absolute top-full left-0 pt-2 z-50 animate-slide-down">
                <div className="bg-white dark:bg-dark-surface rounded-xl shadow-2xl border border-amber-200 dark:border-dark-border p-6 min-w-[600px]">
                  <div className="grid grid-cols-3 gap-6">
                    {item.megaMenu.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-sm font-semibold text-amber-700 dark:text-neon-orange uppercase tracking-wider mb-3">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="group flex items-start gap-3 p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-dark-elevated transition-colors"
                              >
                                {link.icon && (
                                  <span className="text-amber-600 dark:text-neon-orange mt-0.5">
                                    {link.icon}
                                  </span>
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-brown-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-neon-orange">
                                      {link.label}
                                    </span>
                                    {link.badge && (
                                      <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
                                        {link.badge}
                                      </span>
                                    )}
                                  </div>
                                  {link.description && (
                                    <p className="text-sm text-brown-500 dark:text-stone-500">
                                      {link.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full right-0 mt-2 w-screen max-w-sm bg-white dark:bg-dark-surface rounded-xl shadow-2xl border border-amber-200 dark:border-dark-border p-4 animate-slide-down z-50">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 p-3 rounded-lg text-brown-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-dark-elevated transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-brown-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-dark-elevated transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
