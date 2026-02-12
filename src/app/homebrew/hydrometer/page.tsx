'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Thermometer, Calculator, BookOpen, AlertTriangle } from 'lucide-react';

export default function HydrometerPage() {
  const [reading, setReading] = useState<string>('1.050');
  const [tempF, setTempF] = useState<string>('80');
  const [calibrationF, setCalibrationF] = useState<string>('60');

  const readingNum = parseFloat(reading) || 0;
  const tempNum = parseFloat(tempF) || 0;
  const calNum = parseFloat(calibrationF) || 0;

  // Temperature correction formula
  // Correction = reading × (1.00130346 - 0.000134722124 × T + 0.00000204052596 × T² - 0.00000000232820948 × T³)
  // / (1.00130346 - 0.000134722124 × Tcal + 0.00000204052596 × Tcal² - 0.00000000232820948 × Tcal³)
  // Simplified polynomial correction approach:
  const correction = readingNum > 0 && tempNum > 0
    ? 1.313454 - 0.132674 * (tempNum / 100) + 2.057793 * Math.pow(tempNum / 100, 2) - 0.2627634 * Math.pow(tempNum / 100, 3)
      - (1.313454 - 0.132674 * (calNum / 100) + 2.057793 * Math.pow(calNum / 100, 2) - 0.2627634 * Math.pow(calNum / 100, 3))
    : 0;

  const correctedGravity = readingNum + correction / 1000;

  const isValid = readingNum > 0.990 && readingNum < 1.200 && tempNum > 32 && tempNum < 212;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-dark-muted mb-8">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/homebrew" className="hover:text-amber-400 transition-colors">Homebrewing</Link>
          <span>/</span>
          <span className="text-amber-50">Hydrometer</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50">Hydrometer Guide</h1>
          </div>
          <p className="text-dark-muted max-w-2xl">
            Learn how to read and use a hydrometer — the most important measurement tool in homebrewing.
            Includes a temperature correction calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content — spans 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Temperature Correction Calculator */}
            <div className="bg-dark-surface border border-amber-500/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-500" />
                Temperature Correction Calculator
              </h2>
              <p className="text-sm text-dark-muted mb-6">
                Hydrometers are calibrated to read accurately at a specific temperature (usually 60°F / 15.6°C).
                If your sample is at a different temperature, the reading needs correction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Hydrometer Reading
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={reading}
                    onChange={(e) => setReading(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Sample Temperature (°F)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={tempF}
                    onChange={(e) => setTempF(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-50 mb-2">
                    Calibration Temp (°F)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={calibrationF}
                    onChange={(e) => setCalibrationF(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-elevated border border-dark-border rounded-xl text-amber-50 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                  <p className="text-xs text-dark-muted mt-1">Usually 60°F or 68°F</p>
                </div>
              </div>

              {isValid && (
                <div className="bg-dark-elevated border border-dark-border rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Measured Reading</div>
                      <div className="text-2xl font-bold text-amber-50 font-mono">{readingNum.toFixed(3)}</div>
                      <div className="text-xs text-dark-muted">at {tempNum}°F</div>
                    </div>
                    <div>
                      <div className="text-sm text-dark-muted mb-1">Corrected Reading</div>
                      <div className="text-2xl font-bold text-neon-blue font-mono">{correctedGravity.toFixed(3)}</div>
                      <div className="text-xs text-dark-muted">adjusted to {calNum}°F</div>
                    </div>
                  </div>
                  {Math.abs(correction) > 0.5 && (
                    <div className="mt-3 text-xs text-amber-400">
                      Correction: {correction > 0 ? '+' : ''}{(correction / 1000).toFixed(3)} gravity points
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* How to Read a Hydrometer Guide */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-50 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                How to Read a Hydrometer
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-50 mb-1">Collect a Sample</h3>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      Use a sanitized wine thief or turkey baster to pull a sample from your wort or beer
                      into the hydrometer test jar. Fill it about ¾ full — enough for the hydrometer to float freely.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-50 mb-1">Insert the Hydrometer</h3>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      Gently lower the hydrometer into the test jar. Give it a spin to release any air bubbles
                      clinging to the glass — bubbles will make it float higher and give a false reading.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-50 mb-1">Read at Eye Level</h3>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      Wait for the hydrometer to stop bobbing. Get your eyes level with the surface of the liquid.
                      Read the scale where the <strong className="text-amber-50">bottom of the meniscus</strong> (the curved surface of the liquid)
                      crosses the markings. Not the top of the curve — the bottom.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-50 mb-1">Record and Correct</h3>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      Write down the reading and the temperature of the sample. If the sample is not at your
                      hydrometer&apos;s calibration temperature, use the correction calculator above to get the true gravity.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-50 mb-1">Interpreting Your Reading</h3>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      Water reads 1.000 at calibration temperature. Wort with dissolved sugars reads higher
                      (typically 1.030–1.120 depending on the beer). After fermentation, gravity drops as yeast
                      converts sugar to alcohol. Most beers finish between 1.005–1.020.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h2 className="text-lg font-bold text-amber-50 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-neon-orange" />
                Common Mistakes
              </h2>
              <div className="space-y-3">
                {[
                  { mistake: 'Reading at the top of the meniscus', fix: 'Always read at the bottom of the curved liquid surface.' },
                  { mistake: 'Not spinning to remove bubbles', fix: 'Gently twist the hydrometer to dislodge air bubbles that make it float too high.' },
                  { mistake: 'Reading hot wort directly', fix: 'Hot liquid gives inaccurate readings. Cool your sample or use the temperature correction calculator.' },
                  { mistake: 'Not sanitizing the hydrometer', fix: 'Always sanitize before putting it in your wort. Never pour the test sample back into the fermenter.' },
                  { mistake: 'Ignoring calibration temperature', fix: 'Check your hydrometer — most are calibrated to 60°F, but some use 68°F. It matters.' },
                  { mistake: 'Taking only one FG reading', fix: 'Take readings on two consecutive days. If they match, fermentation is truly done. If not, wait longer.' },
                ].map((item, i) => (
                  <div key={i} className="bg-dark-elevated border border-dark-border rounded-xl p-4">
                    <div className="font-semibold text-amber-50 text-sm mb-1">{item.mistake}</div>
                    <div className="text-sm text-dark-muted">{item.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Reference */}
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <h3 className="font-bold text-amber-50 mb-4">Quick Reference</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Water</div>
                  <div className="font-mono text-amber-50 font-bold">1.000</div>
                </div>
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Light Beer Wort</div>
                  <div className="font-mono text-amber-50 font-bold">1.030 – 1.045</div>
                </div>
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Average Ale Wort</div>
                  <div className="font-mono text-amber-50 font-bold">1.045 – 1.065</div>
                </div>
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Strong Ale Wort</div>
                  <div className="font-mono text-amber-50 font-bold">1.065 – 1.090</div>
                </div>
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Imperial / Barleywine</div>
                  <div className="font-mono text-amber-50 font-bold">1.090 – 1.120+</div>
                </div>
                <div className="bg-dark-elevated rounded-xl p-3">
                  <div className="text-dark-muted mb-0.5">Typical Final Gravity</div>
                  <div className="font-mono text-amber-50 font-bold">1.005 – 1.020</div>
                </div>
              </div>
            </div>

            {/* Links */}
            <Link
              href="/homebrew/abv-calculator"
              className="block bg-dark-surface border border-dark-border rounded-2xl p-4 hover:border-amber-500/50 transition-colors text-center text-sm text-amber-400 font-medium"
            >
              Calculate ABV from your readings →
            </Link>

            <Link
              href="/homebrew/equipment"
              className="block bg-dark-surface border border-dark-border rounded-2xl p-4 hover:border-amber-500/50 transition-colors text-center text-sm text-amber-400 font-medium"
            >
              View Equipment Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
