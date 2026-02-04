import Link from 'next/link';
import { Beer, Building2, Layers, GitCompare, BookOpen, Users, Target, Heart, Globe } from 'lucide-react';

const features = [
  {
    icon: <Beer className="w-8 h-8" />,
    title: 'Comprehensive Database',
    description: 'Access detailed information on hundreds of beers from craft breweries to commercial giants.',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Brewery Directory',
    description: 'Discover breweries from around the world with real-time data from Open Brewery DB.',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Style Guides',
    description: 'Learn about 90+ beer styles based on official BJCP 2021 guidelines.',
  },
  {
    icon: <GitCompare className="w-8 h-8" />,
    title: 'Comparison Tools',
    description: 'Compare beers side-by-side to find your next favorite or the perfect alternative.',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Educational Content',
    description: 'From beginner guides to food pairing charts, we help you become a beer expert.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Coverage',
    description: 'Explore beers from every continent, from American IPAs to Belgian Trappist ales.',
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Accuracy',
    description: 'We source data from trusted APIs and official style guidelines.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Accessibility',
    description: 'Beer knowledge should be available to everyone, from newcomers to experts.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Passion',
    description: 'Built by beer lovers, for beer lovers.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-brown-900 dark:via-brown-800 dark:to-amber-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brown-800 dark:text-amber-100 mb-6">
            About EverythingBeer
          </h1>
          <p className="text-xl text-brown-600 dark:text-amber-200 max-w-2xl mx-auto">
            Your one-stop destination to discover, compare, and understand beer.
            From craft to commercial, domestic to international.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-brown-800 rounded-2xl p-8 md:p-12 border border-amber-100 dark:border-brown-700">
            <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Our Mission
            </h2>
            <div className="prose prose-amber dark:prose-invert max-w-none">
              <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed">
                Most beer sites fall into one of three categories: ratings and check-ins,
                review directories, or educational content. We're building something different.
              </p>
              <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed">
                <strong className="text-brown-800 dark:text-amber-100">EverythingBeer</strong> focuses on{' '}
                <strong className="text-amber-600">structured comparisons</strong> and{' '}
                <strong className="text-amber-600">explainable recommendations</strong>.
              </p>
              <p className="text-lg text-brown-600 dark:text-brown-300 leading-relaxed">
                Whether you're asking "What's the closest alternative to my favorite beer that I can actually buy?"
                or "If I like hazy IPAs but hate overly sweet beers, what should I try next?"—we have the answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-amber-50 dark:bg-brown-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-brown-600 dark:text-brown-300 max-w-2xl mx-auto">
              Tools and content designed to help you explore the world of beer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-brown-800 rounded-xl p-6 border border-amber-100 dark:border-brown-700"
              >
                <div className="text-amber-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-brown-800 dark:text-amber-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-brown-600 dark:text-brown-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex p-4 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-brown-800 dark:text-amber-100 mb-2">
                  {value.title}
                </h3>
                <p className="text-brown-600 dark:text-brown-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 bg-amber-50 dark:bg-brown-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-brown-800 rounded-2xl p-8 border border-amber-100 dark:border-brown-700">
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Our Data Sources
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 dark:text-amber-100">
                    Open Brewery DB
                  </h3>
                  <p className="text-brown-600 dark:text-brown-300 text-sm">
                    Free, open-source API for brewery data with information on thousands of breweries worldwide.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 dark:text-amber-100">
                    BJCP 2021 Style Guidelines
                  </h3>
                  <p className="text-brown-600 dark:text-brown-300 text-sm">
                    The Beer Judge Certification Program's comprehensive style guide for consistent categorization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600">
                  <Beer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-800 dark:text-amber-100">
                    Curated Beer Database
                  </h3>
                  <p className="text-brown-600 dark:text-brown-300 text-sm">
                    Hand-curated data on popular craft and commercial beers with detailed flavor profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-6">
            Ready to Explore?
          </h2>
          <p className="text-lg text-brown-600 dark:text-brown-300 mb-8">
            Start discovering new beers, comparing favorites, and learning about styles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/beers"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Beers
            </Link>
            <Link
              href="/styles"
              className="px-8 py-3 border border-amber-300 dark:border-brown-600 text-amber-600 dark:text-amber-400 font-semibold rounded-lg hover:bg-amber-50 dark:hover:bg-brown-800 transition-colors"
            >
              Explore Styles
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-brown-900 text-brown-300 text-center text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>
            Please drink responsibly. You must be of legal drinking age in your country to use this site.
            EverythingBeer does not sell alcohol and is for informational purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}
