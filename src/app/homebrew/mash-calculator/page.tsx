'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Thermometer, Info } from 'lucide-react';
import HomebrewSidebar from '@/components/homebrew/HomebrewSidebar';

// Common mash temperature targets
const mashTargets = [
  { temp: '148°F (64°C)', description: 'Dry, crisp, highly fermentable wort', style: 'IPAs, Dry Stouts, Saisons' },
  { temp: '150°F (65.5°C)', description: 'Balanced fermentability', style: 'Pale Ales, Ambers' },
  { temp: '152°F (66.5°C)', description: 'Medium body, classic mash temp', style: 'Most styles (default)' },
  { temp: '154°F (68°C)', description: 'Fuller body, more residual sweetness', style: 'Porters, Stouts, Scotch Ales' },
  { temp: '156°F (69°C)', description: 'Sweet, full-bodied, low attenuation', style: 'Barleywines, Sweet Stouts' },
  { temp: '158°F (70°C)', description: 'Very sweet, heavy body', style: 'Milk Stouts, Specialty' },
];

export default function MashCalculatorPage() {
  // Strike Water Calculator
  const [grainWeight, setGrainWeight] = useState<string>('10');
  const [grainTemp, setGrainTemp] = useState<string>('70');
  const [targetMashTemp, setTargetMashTemp] = useState<string>('152');
  const [waterToGrainRatio, setWaterToGrainRatio] = useState<string>('1.5'); // qt/lb

  // Water Volume Calculator
  const [mashThickness, setMashThickness] = useState<string>('1.5');
  const [spargeTarget, setSpargeTarget] = useState<string>('6.5'); // pre-boil target volume

  const grainLbs = parseFloat(grainWeight) || 0;
  const grainTempF = parseFloat(grainTemp) || 0;
  const targetF = parseFloat(targetMashTemp) || 0;
  const ratio = parseFloat(waterToGrainRatio) || 0;
  const mashThicknessNum = parseFloat(mashThickness) || 0;
  const spargeTargetNum = parseFloat(spargeTarget) || 0;

  // Strike water temperature formula:
  // Strike Temp = (0.2 / R) × (T_target - T_grain) + T_target
  // Where R = water-to-grain ratio in qt/lb
  const strikeTemp = ratio > 0
    ? (0.2 / ratio) * (targetF - grainTempF) + targetF
    : 0;
  const strikeValid = grainLbs > 0 && ratio > 0 && targetF > 0;

  // Water volumes
  const mashWaterVolume = grainLbs * mashThicknessNum; // in quarts
  const mashWaterGallons = mashWaterVolume / 4;
  const grainAbsorption = grainLbs * 0.125; // ~0.125 gal/lb absorbed
  const mashRunoff = mashWaterGallons - grainAbsorption;
  const spargeWater = spargeTargetNum > 0 ? spargeTargetNum - mashRunoff : 0;
  const totalWater = mashWaterGallons + (spargeWater > 0 ? spargeWater : 0);
  const waterValid = grainLbs > 0 && mashThicknessNum > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Mash Calculator</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Mash Calculator</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Calculate your strike water temperature and water volumes for all-grain and BIAB brewing.
            Hit your target mash temperature every time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Strike Water Temperature */}
            <div className="bg-dark-surface border border-amber-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2">Strike Water Temperature</h2>
              <p className="text-sm text-dark-muted mb-6">
                The grain will cool your hot water when you add it. This calculates how hot your strike water
                needs to be to reach your target mash temperature.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Grain Weight (lbs)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={grainWeight}
                    onChange={(e) => setGrainWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Grain Temp (°F)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={grainTemp}
                    onChange={(e) => setGrainTemp(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Room temp ≈ 70°F</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Target Mash (°F)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={targetMashTemp}
                    onChange={(e) => setTargetMashTemp(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Water:Grain (qt/lb)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.5"
                    value={waterToGrainRatio}
                    onChange={(e) => setWaterToGrainRatio(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Typical: 1.25–1.75</p>
                </div>
              </div>

              {strikeValid && (
                <div className="bg-dark-elevated border border-amber-500/30 rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Strike Water Temperature</div>
                      <div className="text-4xl font-bold text-neon-blue font-mono">
                        {strikeTemp.toFixed(1)}°F
                      </div>
                      <div className="text-xs text-dark-muted mt-1">
                        Heat your water to this temperature before adding grain
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Mash Water Volume</div>
                      <div className="text-4xl font-bold text-amber-50 font-mono">
                        {(grainLbs * ratio / 4).toFixed(1)} gal
                      </div>
                      <div className="text-xs text-dark-muted mt-1">
                        {(grainLbs * ratio).toFixed(1)} quarts ({ratio} qt/lb × {grainLbs} lbs)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Water Volume Calculator */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2">Water Volume Calculator</h2>
              <p className="text-sm text-dark-muted mb-6">
                Calculate your total water needs including mash water, grain absorption, and sparge volume.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Grain Bill (lbs)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={grainWeight}
                    onChange={(e) => setGrainWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Mash Thickness (qt/lb)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.5"
                    value={mashThickness}
                    onChange={(e) => setMashThickness(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Pre-Boil Target (gal)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={spargeTarget}
                    onChange={(e) => setSpargeTarget(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Volume you need in the kettle before boiling</p>
                </div>
              </div>

              {waterValid && (
                <div className="bg-dark-elevated border border-dark-border rounded-xl p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dark-border/50">
                      <span className="text-sm text-amber-50">Mash Water</span>
                      <span className="font-mono text-amber-50">{mashWaterGallons.toFixed(2)} gal ({mashWaterVolume.toFixed(1)} qt)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dark-border/50">
                      <span className="text-sm text-dark-muted">Grain Absorption (est.)</span>
                      <span className="font-mono text-neon-red">−{grainAbsorption.toFixed(2)} gal</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dark-border/50">
                      <span className="text-sm text-dark-muted">First Runnings</span>
                      <span className="font-mono text-dark-muted">{mashRunoff.toFixed(2)} gal</span>
                    </div>
                    {spargeWater > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-dark-border/50">
                        <span className="text-sm text-amber-50">Sparge Water Needed</span>
                        <span className="font-mono text-neon-blue">{spargeWater.toFixed(2)} gal</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 pt-3">
                      <span className="text-sm font-bold text-amber-50">Total Water</span>
                      <span className="font-mono font-bold text-neon-blue text-lg">{totalWater.toFixed(2)} gal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mash Temperature Guide */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4">Mash Temperature Guide</h2>
              <div className="space-y-2">
                {mashTargets.map((t) => (
                  <div key={t.temp} className="bg-dark-elevated rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-amber-50 text-sm">{t.temp}</div>
                        <div className="text-xs text-dark-muted mt-0.5">{t.description}</div>
                      </div>
                      <div className="text-xs text-amber-400 text-right max-w-[150px]">{t.style}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-50 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neon-blue" /> Tips
              </h3>
              <div className="text-sm text-dark-muted space-y-3 leading-relaxed">
                <p>
                  <strong className="text-amber-50">Grain absorption</strong> is approximately 0.125 gallons per pound
                  of grain. This calculator uses that standard estimate.
                </p>
                <p>
                  <strong className="text-amber-50">BIAB brewers:</strong> Use a higher water-to-grain ratio (2.0+ qt/lb)
                  since you&apos;re doing a full-volume mash with no sparge.
                </p>
                <p>
                  <strong className="text-amber-50">Pre-heat your mash tun</strong> with boiling water before adding
                  strike water. This prevents the vessel from absorbing heat and dropping your mash temperature.
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
