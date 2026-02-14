'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Droplets, Info } from 'lucide-react';
import HomebrewSidebar from '@/components/homebrew/HomebrewSidebar';

export default function DilutionBoilOffPage() {
  // Dilution Calculator
  const [currentVolume, setCurrentVolume] = useState<string>('6.5');
  const [currentGravity, setCurrentGravity] = useState<string>('1.060');
  const [targetGravity, setTargetGravity] = useState<string>('1.048');

  // Boil Off Calculator
  const [preBoilVolume, setPreBoilVolume] = useState<string>('7');
  const [boilTime, setBoilTime] = useState<string>('60');
  const [boilOffRate, setBoilOffRate] = useState<string>('1.5'); // gallons per hour

  // Dilution calculation: V1 * G1 = V2 * G2
  const cv = parseFloat(currentVolume) || 0;
  const cg = parseFloat(currentGravity) || 0;
  const tg = parseFloat(targetGravity) || 0;
  const cgPoints = (cg - 1) * 1000;
  const tgPoints = (tg - 1) * 1000;
  const dilutionTargetVolume = tgPoints > 0 ? (cv * cgPoints) / tgPoints : 0;
  const waterToAdd = dilutionTargetVolume - cv;
  const dilutionValid = cg > 1.0 && tg > 1.0 && cg > tg && cv > 0;

  // Boil Off calculation
  const pbv = parseFloat(preBoilVolume) || 0;
  const bt = parseFloat(boilTime) || 0;
  const bor = parseFloat(boilOffRate) || 0;
  const boilOffTotal = (bt / 60) * bor;
  const postBoilVolume = pbv - boilOffTotal;
  const boilOffValid = pbv > 0 && bt > 0 && bor > 0 && postBoilVolume > 0;

  // Gravity concentration from boil
  const preBoilGravityInput = parseFloat(currentGravity) || 0;
  const postBoilGravity = pbv > 0 && postBoilVolume > 0
    ? 1 + ((preBoilGravityInput - 1) * pbv) / postBoilVolume
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Dilution &amp; Boil Off</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Dilution &amp; Boil Off Calculator</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Calculate how much water to add to hit your target gravity, or estimate your post-boil volume
            and gravity concentration from evaporation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dilution Calculator */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2">Dilution Calculator</h2>
              <p className="text-sm text-dark-muted mb-6">
                Your wort is too strong? Calculate how much water to add to reach your target gravity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Current Volume (gal)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={currentVolume}
                    onChange={(e) => setCurrentVolume(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Current Gravity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="1.000"
                    value={currentGravity}
                    onChange={(e) => setCurrentGravity(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Target Gravity
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="1.000"
                    value={targetGravity}
                    onChange={(e) => setTargetGravity(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {dilutionValid && (
                <div className="bg-dark-elevated border border-amber-500/30 rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Water to Add</div>
                      <div className="text-3xl font-bold text-neon-blue font-mono">
                        {waterToAdd.toFixed(2)} gal
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">New Total Volume</div>
                      <div className="text-3xl font-bold text-amber-50 font-mono">
                        {dilutionTargetVolume.toFixed(2)} gal
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Boil Off Calculator */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2">Boil Off Calculator</h2>
              <p className="text-sm text-dark-muted mb-6">
                Estimate your post-boil volume based on your boil time and evaporation rate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Pre-Boil Volume (gal)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={preBoilVolume}
                    onChange={(e) => setPreBoilVolume(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Boil Time (min)
                  </label>
                  <input
                    type="number"
                    step="5"
                    min="0"
                    value={boilTime}
                    onChange={(e) => setBoilTime(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Boil Off Rate (gal/hr)
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={boilOffRate}
                    onChange={(e) => setBoilOffRate(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Typical: 1.0–1.5 gal/hr</p>
                </div>
              </div>

              {boilOffValid && (
                <div className="bg-dark-elevated border border-dark-border rounded-xl p-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Evaporation</div>
                      <div className="text-2xl font-bold text-neon-orange font-mono">
                        {boilOffTotal.toFixed(2)} gal
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Post-Boil Volume</div>
                      <div className="text-2xl font-bold text-neon-blue font-mono">
                        {postBoilVolume.toFixed(2)} gal
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Post-Boil Gravity</div>
                      <div className="text-2xl font-bold text-amber-50 font-mono">
                        {postBoilGravity > 1 ? postBoilGravity.toFixed(3) : '—'}
                      </div>
                      <div className="text-xs text-dark-muted">if pre-boil = {currentGravity}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-50 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-neon-blue" /> Tips
              </h3>
              <div className="text-sm text-dark-muted space-y-3 leading-relaxed">
                <p>
                  <strong className="text-amber-50">Boil off rate</strong> varies by kettle diameter, burner strength,
                  and lid position. Most homebrewers lose 1.0–1.5 gallons per hour on a vigorous, uncovered boil.
                </p>
                <p>
                  <strong className="text-amber-50">Dilution</strong> uses the formula: V1 × G1 = V2 × G2.
                  Always add cool, sanitized water (pre-boiled is ideal) to avoid contamination.
                </p>
                <p>
                  <strong className="text-amber-50">Measure your boil off rate</strong> by marking your kettle
                  before and after a boil. Knowing your specific rate makes all future brew days more predictable.
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
