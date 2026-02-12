'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import type { HopVariety } from '@/types';

type SortField = 'name' | 'origin' | 'alphaAcid' | 'purpose';
type SortDirection = 'asc' | 'desc';

interface HopTableProps {
  hops: HopVariety[];
}

export default function HopTable({ hops }: HopTableProps) {
  const [search, setSearch] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [originFilter, setOriginFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedHop, setExpandedHop] = useState<string | null>(null);

  const origins = useMemo(() => {
    const unique = [...new Set(hops.map((h) => h.origin))].sort();
    return unique;
  }, [hops]);

  const filteredAndSorted = useMemo(() => {
    let result = [...hops];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.origin.toLowerCase().includes(q) ||
          h.aromas.some((a) => a.toLowerCase().includes(q)) ||
          h.commonStyles.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Purpose filter
    if (purposeFilter !== 'all') {
      result = result.filter((h) => h.purpose === purposeFilter);
    }

    // Origin filter
    if (originFilter !== 'all') {
      result = result.filter((h) => h.origin === originFilter);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'origin':
          cmp = a.origin.localeCompare(b.origin);
          break;
        case 'alphaAcid':
          cmp = (a.alphaAcid.min + a.alphaAcid.max) / 2 - (b.alphaAcid.min + b.alphaAcid.max) / 2;
          break;
        case 'purpose':
          cmp = a.purpose.localeCompare(b.purpose);
          break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [hops, search, purposeFilter, originFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const purposeLabels: Record<string, string> = {
    bittering: 'Bittering',
    aroma: 'Aroma',
    'dual-purpose': 'Dual-Purpose',
  };

  const purposeColors: Record<string, string> = {
    bittering: 'bg-neon-red/20 text-neon-red',
    aroma: 'bg-green-500/20 text-green-400',
    'dual-purpose': 'bg-neon-blue/20 text-neon-blue',
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
          <input
            type="text"
            placeholder="Search hops by name, origin, aroma, or style..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-surface border border-dark-border rounded-xl text-amber-50 placeholder:text-dark-muted focus:outline-none focus:border-amber-500/50 text-sm"
          />
        </div>
        <select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          className="px-4 py-2.5 bg-dark-surface border border-dark-border rounded-xl text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
        >
          <option value="all">All Purposes</option>
          <option value="bittering">Bittering</option>
          <option value="aroma">Aroma</option>
          <option value="dual-purpose">Dual-Purpose</option>
        </select>
        <select
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
          className="px-4 py-2.5 bg-dark-surface border border-dark-border rounded-xl text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
        >
          <option value="all">All Origins</option>
          {origins.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-dark-muted mb-4">
        Showing {filteredAndSorted.length} of {hops.length} hop varieties
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              {[
                { field: 'name' as SortField, label: 'Name' },
                { field: 'origin' as SortField, label: 'Origin' },
                { field: 'alphaAcid' as SortField, label: 'Alpha Acid %' },
                { field: 'purpose' as SortField, label: 'Purpose' },
              ].map(({ field, label }) => (
                <th
                  key={field}
                  className="text-left py-3 px-4 text-xs font-bold text-dark-muted uppercase tracking-wider cursor-pointer hover:text-amber-400 transition-colors"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              ))}
              <th className="text-left py-3 px-4 text-xs font-bold text-dark-muted uppercase tracking-wider">
                Aromas
              </th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((hop) => (
              <>
                <tr
                  key={hop.id}
                  className="border-b border-dark-border/50 hover:bg-dark-surface/50 cursor-pointer transition-colors"
                  onClick={() => setExpandedHop(expandedHop === hop.id ? null : hop.id)}
                >
                  <td className="py-3 px-4 font-semibold text-amber-50">{hop.name}</td>
                  <td className="py-3 px-4 text-sm text-dark-muted">{hop.origin}</td>
                  <td className="py-3 px-4 text-sm text-amber-50">
                    {hop.alphaAcid.min}–{hop.alphaAcid.max}%
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${purposeColors[hop.purpose]}`}>
                      {purposeLabels[hop.purpose]}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-dark-muted">
                    {hop.aromas.slice(0, 3).join(', ')}
                  </td>
                  <td className="py-3 px-4">
                    {expandedHop === hop.id ? (
                      <ChevronUp className="w-4 h-4 text-dark-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-dark-muted" />
                    )}
                  </td>
                </tr>
                {expandedHop === hop.id && (
                  <tr key={`${hop.id}-details`}>
                    <td colSpan={6} className="px-4 py-4 bg-dark-surface/30">
                      <HopDetails hop={hop} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredAndSorted.map((hop) => (
          <div key={hop.id} className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedHop(expandedHop === hop.id ? null : hop.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div>
                <div className="font-semibold text-amber-50">{hop.name}</div>
                <div className="text-xs text-dark-muted mt-0.5">
                  {hop.origin} · {hop.alphaAcid.min}–{hop.alphaAcid.max}% AA
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${purposeColors[hop.purpose]}`}>
                  {purposeLabels[hop.purpose]}
                </span>
                {expandedHop === hop.id ? (
                  <ChevronUp className="w-4 h-4 text-dark-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-dark-muted" />
                )}
              </div>
            </button>
            {expandedHop === hop.id && (
              <div className="px-4 pb-4 border-t border-dark-border/50 pt-3">
                <HopDetails hop={hop} />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-dark-muted">
          <p className="text-lg mb-1">No hops found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function HopDetails({ hop }: { hop: HopVariety }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <h5 className="font-semibold text-amber-400 mb-1">Characteristics</h5>
        <ul className="list-disc list-inside text-dark-muted space-y-0.5">
          {hop.characteristics.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="font-semibold text-amber-400 mb-1">Aromas & Flavors</h5>
        <div className="flex flex-wrap gap-1.5">
          {hop.aromas.map((a) => (
            <span key={a} className="text-xs bg-dark-elevated border border-dark-border px-2 py-1 rounded-full text-amber-50">
              {a}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-amber-400 mb-1">Alpha / Beta Acid</h5>
        <p className="text-dark-muted">
          α {hop.alphaAcid.min}–{hop.alphaAcid.max}% · β {hop.betaAcid.min}–{hop.betaAcid.max}%
        </p>
      </div>
      <div>
        <h5 className="font-semibold text-amber-400 mb-1">Substitutes</h5>
        <p className="text-dark-muted">{hop.substitutes.join(', ')}</p>
      </div>
      <div className="sm:col-span-2">
        <h5 className="font-semibold text-amber-400 mb-1">Common Beer Styles</h5>
        <div className="flex flex-wrap gap-1.5">
          {hop.commonStyles.map((s) => (
            <span key={s} className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
