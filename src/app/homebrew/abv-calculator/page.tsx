'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Info } from 'lucide-react';

// Common style ABV ranges for reference
const styleRanges = [
  { style: 'Light Lager', min: 3.5, max: 4.5 },
  { style: 'Blonde Ale', min: 4.0, max: 5.5 },
  { style: 'American Pale Ale', min: 4.5, max: 6.2 },
  { style: 'Hefeweizen', min: 4.3, max: 5.6 },
  { style: 'English Bitter', min: 3.2, max: 4.6 },
  { style: 'Irish Stout', min: 3.8, max: 5.0 },
  { style: 'American IPA', min: 5.5, max: 7.5 },
  { style: 'Belgian Dubbel', min: 6.0, max: 7.6 },
  { style: 'Imperial Stout', min: 8.0, max: 12.0 },
  { style: 'Barleywine', min: 8.0, max: 14.0 },
  { style: 'Double IPA', min: 7.5, max: 10.0 },
  { style: 'Belgian Tripel', min: 7.5, max: 9.5 },
];

export default function ABVCalculatorPage() {
  const [og, setOg] = useState<string>('1.050');
  const [fg, setFg] = useState<string>('1.010');

  const ogNum = parseFloat(og) || 0;
  const fgNum = parseFloat(fg) || 0;

  // Simple formula: ABV = (OG - FG) × 131.25
  const abvSimple = ogNum > 0 && fgNum > 0 ? (ogNum - fgNum) * 131.25 : 0;

  // Alternate (more accurate) formula for higher-gravity beers
  // ABV = (76.08 × (OG - FG) / (1.775 - OG)) × (FG / 0.794)
  const abvAlternate =
    ogNum > 1.0 && fgNum > 0 && ogNum !== 1.775
      ? (76.08 * (ogNum - fgNum)) / (1.775 - ogNum) * (fgNum / 0.794)
      : 0;

  // Apparent Attenuation
  const ogPoints = (ogNum - 1) * 1000;
  const fgPoints = (fgNum - 1) * 1000;
  const attenuation = ogPoints > 0 ? ((ogPoints - fgPoints) / ogPoints) * 100 : 0;

  // Calories (per 12oz)
  const calories = ogNum > 1.0 && fgNum > 0
    ? (6.9 * ((0.8114 * ogPoints) + (3.868 * (ogPoints - fgPoints)) + (0.1) * (ogPoints - fgPoints) * (0.8114 * ogPoints)) / 100) * 3.55
    : 0;

  const isValid = ogNum > 1.0 && fgNum > 1.0 && ogNum > fgNum;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">ABV Calculator</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">ABV Calculator</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Calculate the alcohol by volume (ABV) of your homebrew using your original gravity (OG)
            and final gravity (FG) hydrometer readings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-amber-50 mb-6">Enter Your Readings</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-amber-50 mb-2">
                  Original Gravity (OG)
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="1.000"
                  max="1.200"
                  value={og}
                  onChange={(e) => setOg(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 text-lg font-mono focus:outline-none focus:border-amber-500/50"
                  placeholder="1.050"
                />
                <p className="text-xs text-dark-muted mt-1">
                  Measured before fermentation. Typical range: 1.030 – 1.120
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-50 mb-2">
                  Final Gravity (FG)
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0.990"
                  max="1.100"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 text-lg font-mono focus:outline-none focus:border-amber-500/50"
                  placeholder="1.010"
                />
                <p className="text-xs text-dark-muted mt-1">
                  Measured after fermentation is complete. Typical range: 1.000 – 1.020
                </p>
              </div>
            </div>

            {/* Results */}
            {isValid && (
              <div className="mt-8 space-y-4">
                <div className="bg-dark-elevated border border-amber-500/30 rounded-xl p-5">
                  <div className="text-sm text-dark-muted mb-1">Alcohol by Volume (Standard)</div>
                  <div className="text-4xl font-bold text-neon-blue font-mono">
                    {abvSimple.toFixed(2)}%
                  </div>
                  <div className="text-xs text-dark-muted mt-1">
                    Formula: (OG − FG) × 131.25
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-elevated border border-dark-border rounded-xl p-4">
                    <div className="text-xs text-dark-muted mb-1">Alternate Formula</div>
                    <div className="text-xl font-bold text-amber-50 font-mono">
                      {abvAlternate.toFixed(2)}%
                    </div>
                    <div className="text-xs text-dark-muted">More accurate for high gravity</div>
                  </div>
                  <div className="bg-dark-elevated border border-dark-border rounded-xl p-4">
                    <div className="text-xs text-dark-muted mb-1">Apparent Attenuation</div>
                    <div className="text-xl font-bold text-amber-50 font-mono">
                      {attenuation.toFixed(1)}%
                    </div>
                    <div className="text-xs text-dark-muted">Typical: 65-85%</div>
                  </div>
                </div>

                {calories > 0 && (
                  <div className="bg-dark-elevated border border-dark-border rounded-xl p-4">
                    <div className="text-xs text-dark-muted mb-1">Estimated Calories (per 12 oz)</div>
                    <div className="text-xl font-bold text-amber-50 font-mono">
                      ~{Math.round(calories)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isValid && ogNum > 0 && fgNum > 0 && (
              <div className="mt-6 bg-neon-red/10 border border-neon-red/30 rounded-xl p-4 text-sm text-neon-red">
                OG must be greater than FG, and both must be above 1.000.
              </div>
            )}
          </div>

          {/* Reference Table */}
          <div>
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">ABV by Beer Style</h2>
              <div className="space-y-2">
                {styleRanges.map((s) => (
                  <div key={s.style} className="flex items-center justify-between py-1.5 border-b border-dark-border/50 last:border-0">
                    <span className="text-sm text-amber-50">{s.style}</span>
                    <span className="text-sm text-dark-muted font-mono">
                      {s.min}–{s.max}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-50 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neon-blue" /> How It Works
              </h3>
              <div className="text-sm text-dark-muted space-y-3 leading-relaxed">
                <p>
                  <strong className="text-amber-50">Original Gravity (OG)</strong> measures the sugar
                  content of your wort before fermentation. Higher OG means more sugar for yeast to convert.
                </p>
                <p>
                  <strong className="text-amber-50">Final Gravity (FG)</strong> measures what&apos;s left
                  after fermentation. The difference tells you how much sugar was converted to alcohol.
                </p>
                <p>
                  <strong className="text-amber-50">Attenuation</strong> is the percentage of sugars
                  consumed by yeast. Most ale yeasts attenuate 65-80%. Higher attenuation = drier beer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
