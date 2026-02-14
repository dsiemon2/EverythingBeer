import Link from 'next/link';
import {
  Calculator, Thermometer, Hop, Wrench, BookOpen, ArrowRight,
  Beer, FlaskConical, Home,
} from 'lucide-react';
import HomebrewHubCard from '@/components/homebrew/HomebrewHubCard';
import HomebrewSidebar from '@/components/homebrew/HomebrewSidebar';

export const metadata = {
  title: 'Homebrewing | EverythingBeer',
  description: 'Everything you need to start brewing beer at home. ABV and IBU calculators, hop chart, equipment guides, recipes, and more.',
};

const sections = [
  {
    title: 'ABV Calculator',
    description: 'Calculate alcohol by volume from original and final gravity readings.',
    href: '/homebrew/abv-calculator',
    icon: <Calculator className="w-6 h-6" />,
    badge: 'Tool',
  },
  {
    title: 'IBU Calculator',
    description: 'Estimate bitterness from your hop additions using the Tinseth formula.',
    href: '/homebrew/ibu-calculator',
    icon: <FlaskConical className="w-6 h-6" />,
    badge: 'Tool',
  },
  {
    title: 'Hydrometer Guide',
    description: 'Learn how to read a hydrometer and correct for temperature variations.',
    href: '/homebrew/hydrometer',
    icon: <Thermometer className="w-6 h-6" />,
  },
  {
    title: 'Hop Chart & Comparison',
    description: 'Explore 50+ hop varieties with alpha acids, aromas, substitutes, and more.',
    href: '/homebrew/hops',
    icon: <Hop className="w-6 h-6" />,
  },
  {
    title: 'Equipment Guide',
    description: 'What you need to brew — from starter kits to advanced all-grain setups.',
    href: '/homebrew/equipment',
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    title: 'Recipes',
    description: 'Step-by-step brewing recipes for beginners to advanced brewers.',
    href: '/homebrew/recipes',
    icon: <BookOpen className="w-6 h-6" />,
  },
];

export default function HomebrewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-amber-50">Homebrewing</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Home className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-50">
                Homebrewing
              </h1>
              <p className="text-dark-muted text-sm">Tools, guides, and recipes for brewing at home</p>
            </div>
          </div>
          <p className="text-lg text-dark-muted leading-relaxed max-w-3xl">
            Whether you&apos;re brewing your first batch or perfecting your hundredth recipe,
            this section has everything you need. Use our calculators for precise measurements,
            explore hop varieties for your next brew, and follow tested recipes from extract to all-grain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {sections.map((section) => (
            <HomebrewHubCard
              key={section.href}
              title={section.title}
              description={section.description}
              href={section.href}
              icon={section.icon}
              badge={section.badge}
            />
          ))}
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-dark-surface to-dark-elevated border border-dark-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-50 mb-4 flex items-center gap-2">
              <Beer className="w-6 h-6 text-amber-500" />
              New to Homebrewing?
            </h2>
            <p className="text-dark-muted mb-6 leading-relaxed">
              Start with our equipment guide to see what you need, then pick a beginner recipe
              like the Simple Blonde Ale. You&apos;ll be brewing in no time.
            </p>
            <div className="space-y-3">
              <Link
                href="/homebrew/equipment"
                className="flex items-center justify-between bg-dark-surface border border-dark-border rounded-xl px-4 py-3 hover:border-amber-500/50 transition-colors group"
              >
                <span className="text-amber-50 font-medium">1. See what equipment you need</span>
                <ArrowRight className="w-4 h-4 text-dark-muted group-hover:text-amber-400 transition-colors" />
              </Link>
              <Link
                href="/homebrew/recipes/simple-blonde-ale"
                className="flex items-center justify-between bg-dark-surface border border-dark-border rounded-xl px-4 py-3 hover:border-amber-500/50 transition-colors group"
              >
                <span className="text-amber-50 font-medium">2. Brew your first beer</span>
                <ArrowRight className="w-4 h-4 text-dark-muted group-hover:text-amber-400 transition-colors" />
              </Link>
              <Link
                href="/homebrew/hydrometer"
                className="flex items-center justify-between bg-dark-surface border border-dark-border rounded-xl px-4 py-3 hover:border-amber-500/50 transition-colors group"
              >
                <span className="text-amber-50 font-medium">3. Learn to use your hydrometer</span>
                <ArrowRight className="w-4 h-4 text-dark-muted group-hover:text-amber-400 transition-colors" />
              </Link>
            </div>
          </div>

        </div>

        {/* Related Blog Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: '/homebrew/getting-started', title: 'Getting Started with Homebrewing', description: 'Is homebrewing for you? Find out what it takes to start brewing at home.' },
              { href: '/beer-fyi/hops-the-flower-behind-the-flavor', title: 'Hops: The Flower Behind the Flavor', description: 'Discover the hop varieties that make your favorite beers unique.' },
              { href: '/beer-fyi/the-history-of-beer', title: 'The History of Beer', description: 'From ancient Sumeria to your homebrew — the story of beer.' },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group bg-dark-surface border border-dark-border rounded-xl p-5 hover:border-amber-500/50 transition-all"
              >
                <h3 className="font-semibold text-amber-50 group-hover:text-amber-400 transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-dark-muted line-clamp-2">{article.description}</p>
                <div className="mt-3 flex items-center gap-1 text-amber-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
          </div>

          {/* Sidebar */}
          <HomebrewSidebar />
        </div>
      </div>
    </div>
  );
}
