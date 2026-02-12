import Link from 'next/link';
import type { HomebrewRecipe } from '@/types';

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

interface RecipeCardProps {
  recipe: HomebrewRecipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/homebrew/recipes/${recipe.slug}`}
      className="group bg-dark-surface border border-dark-border rounded-2xl p-6 hover:border-amber-500/50 hover:bg-dark-elevated transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neon-blue/20 text-neon-blue">
            {methodLabels[recipe.method]}
          </span>
        </div>
      </div>

      {/* Title & Style */}
      <h3 className="text-lg font-bold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
        {recipe.title}
      </h3>
      <p className="text-sm text-amber-500/80 font-medium mb-3">{recipe.style}</p>

      {/* Excerpt */}
      <p className="text-sm text-dark-muted leading-relaxed mb-4 line-clamp-2">
        {recipe.excerpt}
      </p>

      {/* Stats Row */}
      <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
        <div className="text-center">
          <div className="text-sm font-bold text-amber-50">{recipe.abv}%</div>
          <div className="text-xs text-dark-muted">ABV</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-amber-50">{recipe.ibu}</div>
          <div className="text-xs text-dark-muted">IBU</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-4 h-4 rounded-full border border-dark-border"
            style={{ backgroundColor: srmToHex(recipe.srm) }}
            title={`SRM: ${recipe.srm}`}
          />
          <div className="text-xs text-dark-muted">SRM {recipe.srm}</div>
        </div>
        <div className="ml-auto text-xs text-dark-muted">
          {recipe.batchSize}
        </div>
      </div>
    </Link>
  );
}

// Convert SRM to approximate hex color
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
