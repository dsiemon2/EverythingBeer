'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Beaker, Info, ArrowLeftRight } from 'lucide-react';
import HomebrewSidebar from '@/components/homebrew/HomebrewSidebar';

export default function BrixConversionPage() {
  const [brix, setBrix] = useState<string>('12');
  const [mode, setMode] = useState<'brix-to-sg' | 'sg-to-brix'>('brix-to-sg');
  const [sgInput, setSgInput] = useState<string>('1.048');

  // OG Brix & FG Brix for ABV from refractometer
  const [ogBrix, setOgBrix] = useState<string>('12');
  const [fgBrix, setFgBrix] = useState<string>('6');

  // Brix to SG: SG = 1 + (brix / (258.6 - (brix × 227.1 / 258.2)))
  // Simplified: SG ≈ 1.000019 + 0.003865613×B + 0.00001318441×B² + 0.00000006922×B³
  const brixNum = parseFloat(brix) || 0;
  const brixToSG = (b: number): number => {
    return 1.000019 + 0.003865613 * b + 0.00001318441 * b * b + 0.00000006922 * b * b * b;
  };
  const sgFromBrix = brixToSG(brixNum);

  // SG to Brix: Brix ≈ ((182.4602 × SG - 775.6821) × SG + 1262.7794) × SG - 669.5622
  const sgNum = parseFloat(sgInput) || 0;
  const sgToBrix = (sg: number): number => {
    return ((182.4602 * sg - 775.6821) * sg + 1262.7794) * sg - 669.5622;
  };
  const brixFromSG = sgToBrix(sgNum);

  // Refractometer FG correction (Sean Terrill formula)
  // When alcohol is present, refractometer reads incorrectly
  const ogBrixNum = parseFloat(ogBrix) || 0;
  const fgBrixNum = parseFloat(fgBrix) || 0;
  const correctedFG = ogBrixNum > 0 && fgBrixNum > 0
    ? 1.0000 - 0.0044993 * ogBrixNum + 0.011774 * fgBrixNum +
      0.00027581 * ogBrixNum * ogBrixNum - 0.0012717 * fgBrixNum * fgBrixNum
    : 0;
  const ogSG = brixToSG(ogBrixNum);
  const refractometerABV = ogSG > 1 && correctedFG > 0 && correctedFG < ogSG
    ? (ogSG - correctedFG) * 131.25
    : 0;
  const refractometerValid = ogBrixNum > 0 && fgBrixNum > 0 && fgBrixNum < ogBrixNum;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Brix Conversion</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Beaker className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Brix Conversion Calculator</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Convert between Brix and Specific Gravity, and use the refractometer correction
            calculator to get accurate FG readings when alcohol is present.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brix ↔ SG Converter */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-amber-50">Brix ↔ Specific Gravity</h2>
                <button
                  onClick={() => setMode(mode === 'brix-to-sg' ? 'sg-to-brix' : 'brix-to-sg')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  Swap
                </button>
              </div>

              {mode === 'brix-to-sg' ? (
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Brix (°Bx)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="40"
                    value={brix}
                    onChange={(e) => setBrix(e.target.value)}
                    className="w-full max-w-xs px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 text-lg font-mono focus:outline-none focus:border-amber-500/50"
                  />

                  {brixNum > 0 && (
                    <div className="mt-6 bg-dark-elevated border border-amber-500/30 rounded-xl p-5">
                      <div className="text-sm text-dark-muted mb-1">Specific Gravity</div>
                      <div className="text-4xl font-bold text-neon-blue font-mono">
                        {sgFromBrix.toFixed(3)}
                      </div>
                      <div className="text-xs text-dark-muted mt-2">
                        {brixNum}°Bx = {((sgFromBrix - 1) * 1000).toFixed(1)} gravity points
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Specific Gravity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="1.000"
                    max="1.200"
                    value={sgInput}
                    onChange={(e) => setSgInput(e.target.value)}
                    className="w-full max-w-xs px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 text-lg font-mono focus:outline-none focus:border-amber-500/50"
                  />

                  {sgNum > 1.0 && (
                    <div className="mt-6 bg-dark-elevated border border-amber-500/30 rounded-xl p-5">
                      <div className="text-sm text-dark-muted mb-1">Brix</div>
                      <div className="text-4xl font-bold text-neon-blue font-mono">
                        {brixFromSG.toFixed(1)}°Bx
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Refractometer FG Correction */}
            <div className="bg-dark-surface border border-amber-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2">Refractometer FG Correction</h2>
              <p className="text-sm text-dark-muted mb-6">
                A refractometer gives incorrect readings after fermentation because alcohol bends light differently
                than sugar. Enter your OG and FG Brix readings to get the corrected final gravity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Original Gravity (Brix)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={ogBrix}
                    onChange={(e) => setOgBrix(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Reading before fermentation</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Final Gravity (Brix)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={fgBrix}
                    onChange={(e) => setFgBrix(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Reading after fermentation (uncorrected)</p>
                </div>
              </div>

              {refractometerValid && (
                <div className="bg-dark-elevated border border-dark-border rounded-xl p-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-dark-muted mb-1">OG (SG)</div>
                      <div className="text-2xl font-bold text-amber-50 font-mono">
                        {ogSG.toFixed(3)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Corrected FG</div>
                      <div className="text-2xl font-bold text-neon-blue font-mono">
                        {correctedFG.toFixed(3)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Estimated ABV</div>
                      <div className="text-2xl font-bold text-neon-orange font-mono">
                        {refractometerABV.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reference Table */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">Quick Reference</h2>
              <div className="grid grid-cols-3 gap-0 text-sm">
                <div className="bg-dark-elevated font-bold text-amber-50 px-3 py-2 rounded-tl-lg">Brix</div>
                <div className="bg-dark-elevated font-bold text-amber-50 px-3 py-2">SG</div>
                <div className="bg-dark-elevated font-bold text-amber-50 px-3 py-2 rounded-tr-lg">Gravity Points</div>
                {[5, 8, 10, 12, 14, 16, 18, 20, 22, 25].map((b) => {
                  const sg = brixToSG(b);
                  return (
                    <div key={b} className="contents">
                      <div className="px-3 py-2 border-t border-dark-border text-amber-50">{b}°Bx</div>
                      <div className="px-3 py-2 border-t border-dark-border text-dark-muted font-mono">{sg.toFixed(3)}</div>
                      <div className="px-3 py-2 border-t border-dark-border text-dark-muted font-mono">{((sg - 1) * 1000).toFixed(1)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-50 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neon-blue" /> About Brix &amp; Refractometers
              </h3>
              <div className="text-sm text-dark-muted space-y-3 leading-relaxed">
                <p>
                  <strong className="text-amber-50">Brix</strong> measures the sugar content of a solution
                  as a percentage by weight. A refractometer reads in Brix and only needs a few drops of wort.
                </p>
                <p>
                  <strong className="text-amber-50">Why correct FG?</strong> After fermentation, alcohol in the sample
                  changes the refractive index, making the refractometer read higher than the actual sugar content.
                  You must apply a correction formula to get accurate post-fermentation readings.
                </p>
                <p>
                  <strong className="text-amber-50">Tip:</strong> For OG measurements (before fermentation),
                  a refractometer is accurate and convenient. For FG, a hydrometer is more reliable —
                  but if you only have a refractometer, use the correction calculator above.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <HomebrewSidebar />
        </div>
      </div>
    </div>
  );
}
