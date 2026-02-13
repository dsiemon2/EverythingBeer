import Link from 'next/link';
import { ArrowRight, Wrench, BookOpen, Beer } from 'lucide-react';

export const metadata = {
  title: 'Getting Started with Homebrewing | EverythingBeer',
  description: 'Is homebrewing for you? Learn what it takes to start brewing your own beer at home — from mindset to equipment to your first batch.',
};

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Getting Started</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <span className="inline-block text-xs font-bold text-neon-orange uppercase tracking-wider mb-3">
            Homebrewing
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50 mb-4">
            Getting Started with Homebrewing
          </h1>
          <p className="text-lg text-dark-muted">
            Everything you need to know before brewing your first batch.
          </p>
        </header>

        {/* Article Content */}
        <article className="prose-homebrew space-y-6">
          <p className="text-dark-muted leading-relaxed text-lg">
            Is homebrewing for you? Start by asking yourself a few questions: Do you appreciate
            high-quality beer? Does the idea of crafting your own brew sound exciting? Are you
            ready to invest a bit of time and money into a new hobby?
          </p>

          <p className="text-dark-muted leading-relaxed">
            Brewing great beer doesn&apos;t require expert-level knowledge right away, but you
            should be prepared for some initial equipment costs. If you decide to dive in,
            homebrewing quickly becomes a rewarding pursuit where you collect both gear and
            expertise along the way. Before long, you&apos;ll be impressing your friends with
            professional-quality beer brewed right in your kitchen.
          </p>

          <p className="text-dark-muted leading-relaxed">
            Beyond the satisfaction of the craft, homebrewing can actually be more cost-effective
            than buying commercial craft beer. It also puts you in total control of the ingredients
            and the process. As a homebrewer, an entire world of styles is open to you; you can
            brew standard &ldquo;kit&rdquo; beers, clone favorites from your local brewery,
            or&mdash;as I prefer&mdash;create your own unique recipes. For me, the most rewarding
            part is seeing friends and family enjoy a recipe I designed from scratch.
          </p>

          <p className="text-dark-muted leading-relaxed">
            You&apos;ll no longer be limited to what&apos;s on the shelf at the local store. Along
            the way, you&apos;ll discover new styles and likely meet a great community of fellow
            brewers. The benefits of homebrewing speak for themselves&mdash;and if you&apos;ve made
            it this far, you&apos;re probably already sold!
          </p>
        </article>

        {/* Next Steps */}
        <div className="mt-12 space-y-4">
          <h2 className="text-xl font-bold text-amber-50">Ready to Get Started?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/homebrew/equipment"
              className="group bg-dark-surface border border-dark-border rounded-xl p-5 hover:border-amber-500/50 transition-colors"
            >
              <Wrench className="w-5 h-5 text-amber-500 mb-2" />
              <h3 className="font-semibold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
                Equipment Guide
              </h3>
              <p className="text-xs text-dark-muted">See what you need to brew your first batch.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                View guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/homebrew/recipes/simple-blonde-ale"
              className="group bg-dark-surface border border-dark-border rounded-xl p-5 hover:border-amber-500/50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-amber-500 mb-2" />
              <h3 className="font-semibold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
                Your First Recipe
              </h3>
              <p className="text-xs text-dark-muted">A simple blonde ale perfect for beginners.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                View recipe <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/homebrew/hydrometer"
              className="group bg-dark-surface border border-dark-border rounded-xl p-5 hover:border-amber-500/50 transition-colors"
            >
              <Beer className="w-5 h-5 text-amber-500 mb-2" />
              <h3 className="font-semibold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
                Learn the Hydrometer
              </h3>
              <p className="text-xs text-dark-muted">The most important measurement tool you&apos;ll own.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Read guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
