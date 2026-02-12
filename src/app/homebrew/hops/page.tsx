import { Hop } from 'lucide-react';
import Link from 'next/link';
import { getAllHops } from '@/data/hop-varieties';
import HopTable from '@/components/homebrew/HopTable';

export const metadata = {
  title: 'Hop Chart & Comparison | EverythingBeer',
  description: 'Explore 50+ hop varieties with alpha acid ranges, aromas, flavor profiles, substitutes, and common beer styles. Sort, filter, and compare hops for your homebrew.',
};

export default function HopsPage() {
  const hops = getAllHops();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Hop Chart</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Hop className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Hop Chart & Comparison</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Browse {hops.length} hop varieties from around the world. Search by name, filter by purpose or origin,
            and click any hop to see detailed aroma profiles, substitutes, and common beer styles.
          </p>
        </div>

        {/* Hop Table */}
        <HopTable hops={hops} />

        {/* Bottom Links */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/homebrew/ibu-calculator"
            className="bg-dark-surface border border-dark-border rounded-xl px-5 py-3 hover:border-amber-500/50 transition-colors text-sm text-amber-400 font-medium"
          >
            Calculate IBU from your hops →
          </Link>
          <Link
            href="/homebrew/recipes"
            className="bg-dark-surface border border-dark-border rounded-xl px-5 py-3 hover:border-amber-500/50 transition-colors text-sm text-amber-400 font-medium"
          >
            Browse Recipes →
          </Link>
        </div>
      </div>
    </div>
  );
}
