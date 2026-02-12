import Link from 'next/link';
import { Wrench, ArrowRight } from 'lucide-react';
import { getEquipmentByTier, tierSummaries } from '@/data/homebrew-equipment';
import EquipmentTierSection from '@/components/homebrew/EquipmentTierSection';

export const metadata = {
  title: 'Homebrewing Equipment Guide | EverythingBeer',
  description: 'Everything you need to brew beer at home — from starter kits to advanced all-grain setups. Equipment lists with descriptions and price ranges for every level.',
};

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Equipment Guide</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Equipment Guide</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            You don&apos;t need to spend a fortune to start brewing. Here&apos;s what you need at every level —
            from your first extract batch to a full all-grain setup with kegging.
          </p>
        </div>

        {/* Tier Sections */}
        <div className="space-y-4 mb-12">
          {tierSummaries.map((summary) => (
            <EquipmentTierSection
              key={summary.tier}
              tier={summary.tier}
              label={summary.label}
              description={summary.description}
              totalPriceRange={summary.totalPriceRange}
              items={getEquipmentByTier(summary.tier)}
              defaultExpanded={summary.tier === 'starter'}
            />
          ))}
        </div>

        {/* Tip */}
        <div className="bg-dark-surface border border-amber-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-amber-50 mb-3">Pro Tip: Start Simple</h2>
          <p className="text-sm text-dark-muted leading-relaxed mb-4">
            Many homebrewers make the mistake of buying too much equipment upfront. Start with a basic starter kit
            and brew a few extract batches first. You&apos;ll learn what upgrades actually matter to you.
            The single best investment after your starter kit is <strong className="text-amber-50">fermentation temperature control</strong> —
            it makes more difference than any other upgrade.
          </p>
          <Link
            href="/homebrew/recipes/simple-blonde-ale"
            className="inline-flex items-center gap-2 text-sm text-amber-400 font-medium hover:text-amber-300 transition-colors"
          >
            Start with our Simple Blonde Ale recipe <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/homebrew/recipes"
            className="bg-dark-surface border border-dark-border rounded-xl px-5 py-3 hover:border-amber-500/50 transition-colors text-sm text-amber-400 font-medium"
          >
            Browse Recipes →
          </Link>
          <Link
            href="/homebrew/hydrometer"
            className="bg-dark-surface border border-dark-border rounded-xl px-5 py-3 hover:border-amber-500/50 transition-colors text-sm text-amber-400 font-medium"
          >
            Learn to Use Your Hydrometer →
          </Link>
        </div>
      </div>
    </div>
  );
}
