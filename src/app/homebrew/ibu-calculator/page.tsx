'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FlaskConical, Plus, Trash2, Info } from 'lucide-react';

interface HopAddition {
  id: number;
  name: string;
  alphaAcid: string;
  amount: string;
  boilTime: string;
}

// IBU ranges by style for reference
const styleIBURanges = [
  { style: 'Light Lager', min: 5, max: 15 },
  { style: 'Wheat Beer', min: 8, max: 18 },
  { style: 'Blonde Ale', min: 15, max: 28 },
  { style: 'English Bitter', min: 20, max: 35 },
  { style: 'American Pale Ale', min: 30, max: 50 },
  { style: 'Porter', min: 18, max: 35 },
  { style: 'Irish Stout', min: 25, max: 45 },
  { style: 'American IPA', min: 40, max: 70 },
  { style: 'Double IPA', min: 60, max: 100 },
  { style: 'Imperial Stout', min: 50, max: 90 },
  { style: 'Barleywine', min: 40, max: 100 },
];

let nextId = 2;

export default function IBUCalculatorPage() {
  const [batchSize, setBatchSize] = useState<string>('5');
  const [boilGravity, setBoilGravity] = useState<string>('1.050');
  const [additions, setAdditions] = useState<HopAddition[]>([
    { id: 1, name: 'Cascade', alphaAcid: '5.5', amount: '1', boilTime: '60' },
  ]);

  const addHopAddition = () => {
    setAdditions([
      ...additions,
      { id: nextId++, name: '', alphaAcid: '', amount: '', boilTime: '60' },
    ]);
  };

  const removeHopAddition = (id: number) => {
    if (additions.length > 1) {
      setAdditions(additions.filter((a) => a.id !== id));
    }
  };

  const updateAddition = (id: number, field: keyof HopAddition, value: string) => {
    setAdditions(additions.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  // Tinseth IBU Calculation
  const batchSizeNum = parseFloat(batchSize) || 0;
  const bgNum = parseFloat(boilGravity) || 0;

  const calculateIBU = (alphaAcid: number, amountOz: number, boilMin: number): number => {
    if (batchSizeNum <= 0 || bgNum <= 0) return 0;

    // Bigness factor
    const bignessFactor = 1.65 * Math.pow(0.000125, bgNum - 1);

    // Boil time factor
    const boilTimeFactor = (1 - Math.exp(-0.04 * boilMin)) / 4.15;

    // Utilization
    const utilization = bignessFactor * boilTimeFactor;

    // IBU = (AA% × amount_oz × utilization × 7490) / batch_gallons
    const ibu = (alphaAcid / 100) * amountOz * utilization * 7490 / batchSizeNum;
    return Math.max(0, ibu);
  };

  const hopResults = additions.map((a) => {
    const aa = parseFloat(a.alphaAcid) || 0;
    const amt = parseFloat(a.amount) || 0;
    const time = parseFloat(a.boilTime) || 0;
    return {
      ...a,
      ibu: calculateIBU(aa, amt, time),
    };
  });

  const totalIBU = hopResults.reduce((sum, r) => sum + r.ibu, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">IBU Calculator</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">IBU Calculator</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Estimate the International Bitterness Units (IBU) of your beer using the Tinseth formula.
            Add multiple hop additions to calculate total bitterness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator — spans 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Parameters */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">Batch Parameters</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Batch Size (gallons)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={batchSize}
                    onChange={(e) => setBatchSize(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Boil Gravity (pre-boil)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="1.000"
                    value={boilGravity}
                    onChange={(e) => setBoilGravity(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Hop Additions */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-amber-50">Hop Additions</h2>
                <button
                  onClick={addHopAddition}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Hop
                </button>
              </div>

              <div className="space-y-4">
                {additions.map((addition, index) => (
                  <div
                    key={addition.id}
                    className="bg-dark-elevated border border-dark-border rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-dark-muted">
                        Addition #{index + 1}
                      </span>
                      {additions.length > 1 && (
                        <button
                          onClick={() => removeHopAddition(addition.id)}
                          className="text-dark-muted hover:text-neon-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-dark-muted mb-1">Hop Name</label>
                        <input
                          type="text"
                          value={addition.name}
                          onChange={(e) => updateAddition(addition.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-amber-50 text-sm focus:outline-none focus:border-amber-500/50"
                          placeholder="Cascade"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-dark-muted mb-1">Alpha Acid %</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={addition.alphaAcid}
                          onChange={(e) => updateAddition(addition.id, 'alphaAcid', e.target.value)}
                          className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-amber-50 text-sm font-mono focus:outline-none focus:border-amber-500/50"
                          placeholder="5.5"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-dark-muted mb-1">Amount (oz)</label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          value={addition.amount}
                          onChange={(e) => updateAddition(addition.id, 'amount', e.target.value)}
                          className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-amber-50 text-sm font-mono focus:outline-none focus:border-amber-500/50"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-dark-muted mb-1">Boil Time (min)</label>
                        <input
                          type="number"
                          step="5"
                          min="0"
                          max="120"
                          value={addition.boilTime}
                          onChange={(e) => updateAddition(addition.id, 'boilTime', e.target.value)}
                          className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-amber-50 text-sm font-mono focus:outline-none focus:border-amber-500/50"
                          placeholder="60"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-dark-surface border border-amber-500/30 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">Results</h2>

              <div className="bg-dark-elevated border border-dark-border rounded-xl p-5 mb-4">
                <div className="text-sm text-dark-muted mb-1">Estimated Total IBU</div>
                <div className="text-4xl font-bold text-neon-blue font-mono">
                  {totalIBU.toFixed(1)}
                </div>
                <div className="text-xs text-dark-muted mt-1">Tinseth Method</div>
              </div>

              {hopResults.length > 1 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-dark-muted uppercase tracking-wider">Per Addition</h3>
                  {hopResults.map((r, i) => (
                    <div key={r.id} className="flex items-center justify-between py-2 border-b border-dark-border/50 last:border-0">
                      <span className="text-sm text-amber-50">
                        {r.name || `Addition #${i + 1}`} — {r.amount} oz @ {r.boilTime} min
                      </span>
                      <span className="text-sm font-mono text-amber-50">
                        {r.ibu.toFixed(1)} IBU
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* IBU Reference */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">IBU by Style</h2>
              <div className="space-y-2">
                {styleIBURanges.map((s) => (
                  <div key={s.style} className="flex items-center justify-between py-1.5 border-b border-dark-border/50 last:border-0">
                    <span className="text-sm text-amber-50">{s.style}</span>
                    <span className="text-sm text-dark-muted font-mono">
                      {s.min}–{s.max}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-50 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neon-blue" /> About IBU
              </h3>
              <div className="text-sm text-dark-muted space-y-3 leading-relaxed">
                <p>
                  <strong className="text-amber-50">IBU</strong> (International Bitterness Units) measures
                  the bitterness from hops. Higher IBU = more bitter, but perceived bitterness also depends
                  on malt sweetness.
                </p>
                <p>
                  <strong className="text-amber-50">Alpha Acid %</strong> indicates a hop&apos;s bittering
                  potential. Check your hop package — it varies by lot.
                </p>
                <p>
                  <strong className="text-amber-50">Boil Time</strong> determines utilization — longer boils
                  extract more bitterness. Late additions (5-15 min) add flavor and aroma with less bitterness.
                </p>
                <p>
                  The <strong className="text-amber-50">Tinseth formula</strong> is the most widely used
                  IBU estimation method in homebrewing.
                </p>
              </div>
            </div>

            <Link
              href="/homebrew/hops"
              className="block text-center bg-dark-surface border border-dark-border rounded-2xl p-4 hover:border-amber-500/50 transition-colors text-sm text-amber-400 font-medium"
            >
              Browse Hop Varieties →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
