'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Gauge, Droplets, Beer, BookOpen, Lightbulb } from 'lucide-react';
import { getRecipeBySlug, getAllRecipes } from '@/data/homebrew-recipes';

// SRM to hex color
function srmToHex(srm: number): string {
  const srmColors: Record<number, string> = {
    1: '#FFE699', 2: '#FFD878', 3: '#FFCA5A', 4: '#FFBF42', 5: '#FBB123',
    6: '#F8A600', 7: '#F39C00', 8: '#EA8F00', 9: '#E58500', 10: '#DE7C00',
    12: '#D77200', 14: '#CF6900', 16: '#CB6200', 18: '#C35900', 20: '#BB5100',
    25: '#A44200', 30: '#8D3400', 35: '#7C2900', 40: '#6B1F00',
  };
  const keys = Object.keys(srmColors).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const key of keys) {
    if (key <= srm) closest = key;
  }
  return srmColors[closest] || '#3B1A00';
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-red-500/20 text-red-400',
};

const methodLabels: Record<string, string> = {
  extract: 'Extract',
  'partial-mash': 'Partial Mash',
  'all-grain': 'All Grain',
  biab: 'BIAB',
};

interface RecipeDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { slug } = use(params);
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-50 mb-2">Recipe Not Found</h1>
          <p className="text-dark-muted mb-4">The recipe you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/homebrew/recipes" className="text-amber-400 hover:text-amber-300">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  // Get related recipes (same difficulty or method, excluding current)
  const related = getAllRecipes()
    .filter((r) => r.slug !== slug && (r.difficulty === recipe.difficulty || r.method === recipe.method))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <Link href="/homebrew/recipes" className="hover:text-amber-400 transition-colors">Recipes</Link>
          <span>/</span>
          <span className="text-amber-50 truncate">{recipe.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neon-blue/20 text-neon-blue">
              {methodLabels[recipe.method]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50 mb-2">{recipe.title}</h1>
          <p className="text-lg text-dark-muted">{recipe.style} · {recipe.batchSize}</p>
          <p className="text-dark-muted mt-3 leading-relaxed">{recipe.excerpt}</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xs text-dark-muted mb-1">OG</div>
            <div className="text-lg font-bold text-amber-50 font-mono">{recipe.og.toFixed(3)}</div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xs text-dark-muted mb-1">FG</div>
            <div className="text-lg font-bold text-amber-50 font-mono">{recipe.fg.toFixed(3)}</div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xs text-dark-muted mb-1">ABV</div>
            <div className="text-lg font-bold text-neon-blue font-mono">{recipe.abv}%</div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xs text-dark-muted mb-1">IBU</div>
            <div className="text-lg font-bold text-amber-50 font-mono">{recipe.ibu}</div>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <div className="text-xs text-dark-muted mb-1">SRM</div>
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-5 h-5 rounded-full border border-dark-border"
                style={{ backgroundColor: srmToHex(recipe.srm) }}
              />
              <span className="text-lg font-bold text-amber-50 font-mono">{recipe.srm}</span>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
            <Beer className="w-6 h-6 text-amber-500" />
            Ingredients
          </h2>

          {/* Grains/Extracts */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Grains & Extracts
            </h3>
            <div className="space-y-2">
              {recipe.grains.map((grain, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-dark-border/50 last:border-0">
                  <div>
                    <span className="text-amber-50 font-medium">{grain.name}</span>
                    {grain.notes && (
                      <p className="text-xs text-dark-muted mt-0.5">{grain.notes}</p>
                    )}
                  </div>
                  <span className="text-sm text-dark-muted font-mono ml-4 whitespace-nowrap">
                    {grain.amount} {grain.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hops */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Hops
            </h3>
            <div className="space-y-2">
              {recipe.hops.map((hop, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-dark-border/50 last:border-0">
                  <div>
                    <span className="text-amber-50 font-medium">{hop.name}</span>
                    <span className="text-xs text-dark-muted ml-2">({hop.alphaAcid}% AA)</span>
                    <div className="text-xs text-dark-muted mt-0.5">
                      {hop.timing} — <span className="capitalize">{hop.purpose}</span>
                    </div>
                  </div>
                  <span className="text-sm text-dark-muted font-mono ml-4 whitespace-nowrap">
                    {hop.amount} {hop.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Yeast */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 mb-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Yeast
            </h3>
            <p className="text-amber-50">{recipe.yeast}</p>
          </div>

          {/* Other Ingredients */}
          {recipe.otherIngredients && recipe.otherIngredients.length > 0 && (
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                Other Ingredients
              </h3>
              <div className="space-y-2">
                {recipe.otherIngredients.map((item, i) => (
                  <div key={i} className="flex items-start justify-between py-2 border-b border-dark-border/50 last:border-0">
                    <div>
                      <span className="text-amber-50 font-medium">{item.name}</span>
                      {item.notes && <p className="text-xs text-dark-muted mt-0.5">{item.notes}</p>}
                    </div>
                    <span className="text-sm text-dark-muted font-mono ml-4 whitespace-nowrap">
                      {item.amount} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Instructions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            Instructions
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-dark-muted leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        {recipe.tips.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-amber-50 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-neon-orange" />
              Brewer&apos;s Tips
            </h2>
            <div className="bg-dark-surface border border-neon-orange/30 rounded-2xl p-6 space-y-3">
              {recipe.tips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-neon-orange mt-0.5">•</span>
                  <p className="text-dark-muted leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Recipes */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-amber-50 mb-4">More Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/homebrew/recipes/${r.slug}`}
                  className="group bg-dark-surface border border-dark-border rounded-xl p-4 hover:border-amber-500/50 transition-colors"
                >
                  <h3 className="font-semibold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-dark-muted">{r.style} · {r.abv}% ABV · {r.ibu} IBU</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <Link
          href="/homebrew/recipes"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Recipes
        </Link>
      </div>
    </div>
  );
}
