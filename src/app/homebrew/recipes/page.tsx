'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getAllRecipes } from '@/data/homebrew-recipes';
import RecipeCard from '@/components/homebrew/RecipeCard';

export default function RecipesPage() {
  const allRecipes = getAllRecipes();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const filtered = allRecipes.filter((r) => {
    if (difficultyFilter !== 'all' && r.difficulty !== difficultyFilter) return false;
    if (methodFilter !== 'all' && r.method !== methodFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Recipes</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Homebrew Recipes</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Tested recipes for every skill level. Each recipe includes step-by-step instructions,
            ingredient lists, and brewer&apos;s tips.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2.5 bg-dark-surface border border-dark-border rounded-xl text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2.5 bg-dark-surface border border-dark-border rounded-xl text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="all">All Methods</option>
            <option value="extract">Extract</option>
            <option value="partial-mash">Partial Mash</option>
            <option value="all-grain">All Grain</option>
            <option value="biab">BIAB</option>
          </select>
          <span className="text-sm text-dark-muted self-center ml-2">
            {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-dark-muted">
            <p className="text-lg mb-2">No recipes match your filters</p>
            <p className="text-sm">Try changing the difficulty or method filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
