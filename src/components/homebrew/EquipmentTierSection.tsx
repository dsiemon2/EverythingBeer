'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Star } from 'lucide-react';
import type { EquipmentItem } from '@/types';

const categoryLabels: Record<string, string> = {
  brewing: 'Brewing',
  fermentation: 'Fermentation',
  bottling: 'Bottling & Transferring',
  measurement: 'Measurement',
  cleaning: 'Cleaning & Sanitizing',
  kegging: 'Kegging & Draft',
};

const categoryOrder = ['brewing', 'fermentation', 'bottling', 'kegging', 'measurement', 'cleaning'];

interface EquipmentTierSectionProps {
  tier: 'starter' | 'intermediate' | 'advanced';
  label: string;
  description: string;
  totalPriceRange: string;
  items: EquipmentItem[];
  defaultExpanded?: boolean;
}

export default function EquipmentTierSection({
  tier,
  label,
  description,
  totalPriceRange,
  items,
  defaultExpanded = false,
}: EquipmentTierSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const tierColors: Record<string, { bg: string; border: string; badge: string; icon: string }> = {
    starter: {
      bg: 'bg-green-500/5',
      border: 'border-green-500/30',
      badge: 'bg-green-500/20 text-green-400',
      icon: 'text-green-400',
    },
    intermediate: {
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/20 text-amber-400',
      icon: 'text-amber-400',
    },
    advanced: {
      bg: 'bg-neon-red/5',
      border: 'border-neon-red/30',
      badge: 'bg-neon-red/20 text-neon-red',
      icon: 'text-neon-red',
    },
  };

  const colors = tierColors[tier];
  const essentialItems = items.filter((i) => i.essential);
  const optionalItems = items.filter((i) => !i.essential);

  // Group items by category
  const groupByCategory = (itemList: EquipmentItem[]) => {
    const groups: Record<string, EquipmentItem[]> = {};
    for (const item of itemList) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return categoryOrder
      .filter((cat) => groups[cat])
      .map((cat) => ({ category: cat, items: groups[cat] }));
  };

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-2xl overflow-hidden`}>
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-dark-surface/50 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-amber-50">{label}</h3>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
              {totalPriceRange}
            </span>
          </div>
          <p className="text-sm text-dark-muted">{description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-dark-muted">
            <span>{essentialItems.length} essential items</span>
            {optionalItems.length > 0 && <span>{optionalItems.length} optional upgrades</span>}
          </div>
        </div>
        <div className={`ml-4 ${colors.icon}`}>
          {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Essential Items */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" /> Essential Equipment
            </h4>
            <div className="space-y-4">
              {groupByCategory(essentialItems).map(({ category, items: catItems }) => (
                <div key={category}>
                  <h5 className="text-xs font-semibold text-dark-muted uppercase tracking-wider mb-2">
                    {categoryLabels[category]}
                  </h5>
                  <div className="space-y-2">
                    {catItems.map((item) => (
                      <div
                        key={item.name}
                        className="bg-dark-surface border border-dark-border rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h6 className="font-semibold text-amber-50">{item.name}</h6>
                          <span className="text-xs font-medium text-amber-500 ml-2 whitespace-nowrap">
                            {item.priceRange}
                          </span>
                        </div>
                        <p className="text-sm text-dark-muted leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Items */}
          {optionalItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-dark-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" /> Nice to Have
              </h4>
              <div className="space-y-2">
                {optionalItems.map((item) => (
                  <div
                    key={item.name}
                    className="bg-dark-surface/50 border border-dark-border/50 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h6 className="font-semibold text-amber-50/80">{item.name}</h6>
                      <span className="text-xs font-medium text-dark-muted ml-2 whitespace-nowrap">
                        {item.priceRange}
                      </span>
                    </div>
                    <p className="text-sm text-dark-muted/80 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
