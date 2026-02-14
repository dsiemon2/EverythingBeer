'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Calculator,
  FlaskConical,
  Droplets,
  Thermometer,
  Beaker,
  Lightbulb,
  ChevronRight,
  Star,
  Beer,
  BookOpen,
  Wrench,
  Hop,
  Home,
  Mail,
} from 'lucide-react';
import { getRandomHomebrewFacts } from '@/data/homebrew-pint-sized-posts';

export default function HomebrewSidebar() {
  const randomFacts = getRandomHomebrewFacts(3);

  return (
    <aside className="space-y-6">
      {/* ===== 1. Homebrewing Simplified Book Ad ===== */}
      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-neon-orange to-neon-rust px-4 py-3">
          <h3 className="text-white font-bold text-sm">
            📖 Recommended Reading
          </h3>
        </div>
        <div className="p-4 text-center">
          <Image
            src="/everythingbeer/images/homebrewing-simplified.png"
            alt="Homebrewing Simplified - A Beginner's Guide To Making Your Own Beer! by Bryan Siemon"
            width={200}
            height={280}
            className="mx-auto mb-3 rounded-lg shadow-md"
          />
          <h4 className="font-bold text-amber-50 text-sm mb-1">
            Homebrewing Simplified
          </h4>
          <p className="text-xs text-dark-muted mb-2">
            A Beginner&apos;s Guide To Making Your Own Beer!
          </p>
          <p className="text-[10px] text-dark-muted">
            By Bryan Siemon
          </p>
        </div>
      </div>

      {/* ===== 2. Calculators ===== */}
      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-3">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Calculators
          </h3>
        </div>
        <div className="p-3 space-y-1">
          {[
            { href: '/homebrew/abv-calculator', label: 'ABV Calculator', icon: <Calculator className="w-4 h-4" /> },
            { href: '/homebrew/ibu-calculator', label: 'IBU Calculator', icon: <FlaskConical className="w-4 h-4" /> },
            { href: '/homebrew/dilution-boiloff', label: 'Dilution & Boil Off', icon: <Droplets className="w-4 h-4" /> },
            { href: '/homebrew/brix-conversion', label: 'Brix Conversion', icon: <Beaker className="w-4 h-4" /> },
            { href: '/homebrew/mash-calculator', label: 'Mash Calculator', icon: <Thermometer className="w-4 h-4" /> },
          ].map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-dark-elevated transition-colors group"
            >
              <span className="text-amber-500">{calc.icon}</span>
              <span className="text-sm font-medium text-stone-200 group-hover:text-amber-400 transition-colors">
                {calc.label}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-dark-muted ml-auto" />
            </Link>
          ))}
          <div className="px-2.5 pt-1.5">
            <p className="text-[10px] text-dark-muted italic">More calculators coming soon...</p>
          </div>
        </div>
      </div>

      {/* ===== 3. Stay Updated ===== */}
      <div className="bg-dark-surface rounded-xl p-5 text-center border border-dark-border">
        <Mail className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <h3 className="text-white font-bold text-sm mb-2">Stay Updated</h3>
        <p className="text-stone-400 text-xs mb-4">
          Homebrew tips, new recipes & calculators in your inbox.
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm rounded-lg bg-dark-elevated border border-dark-border text-stone-200 placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-neon-orange"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 text-sm bg-gradient-to-r from-neon-red to-neon-orange hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all"
          >
            Subscribe
          </button>
        </form>
        <p className="text-[10px] text-dark-muted mt-2">No spam. Must be 21+.</p>
      </div>

      {/* ===== 4. Pint-Sized Posts (Homebrew Edition) ===== */}
      <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
        <div className="bg-gradient-to-r from-neon-rust to-neon-orange px-4 py-3">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Pint-Sized Posts — Homebrew Edition
          </h3>
        </div>
        <div className="divide-y divide-dark-border">
          {randomFacts.map((fact) => (
            <div key={fact.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{fact.icon || '🍺'}</span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {fact.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-dark-border">
          <Link
            href="/pint-sized-posts"
            className="text-xs font-medium text-neon-orange hover:text-neon-red flex items-center gap-1 transition-colors"
          >
            More Beer Facts <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ===== 5. Sponsors Ad(s) ===== */}
      <a
        href="https://mangydogcoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden border border-dark-border hover:border-neon-orange/40 transition-colors group"
      >
        <Image
          src="/everythingbeer/images/mangy-dog-coffee.png"
          alt="Mangy Dog Coffee - Coffee With A Bite"
          width={300}
          height={300}
          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
        />
      </a>

      {/* ===== 6. Explore ===== */}
      <div className="bg-dark-surface rounded-xl border border-dark-border overflow-hidden">
        <div className="bg-gradient-to-r from-neon-blue to-neon-blue/70 px-4 py-3">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <Star className="w-4 h-4" />
            Explore
          </h3>
        </div>
        <div className="p-3 space-y-1">
          {[
            { icon: <Home className="w-4 h-4" />, label: 'All Homebrewing', href: '/homebrew', color: 'text-amber-500' },
            { icon: <BookOpen className="w-4 h-4" />, label: 'Recipes', href: '/homebrew/recipes', color: 'text-neon-orange' },
            { icon: <Wrench className="w-4 h-4" />, label: 'Equipment Guide', href: '/homebrew/equipment', color: 'text-neon-blue' },
            { icon: <Hop className="w-4 h-4" />, label: 'Hop Chart', href: '/homebrew/hops', color: 'text-green-400' },
            { icon: <Beer className="w-4 h-4" />, label: 'Getting Started', href: '/homebrew/getting-started', color: 'text-neon-rust' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-dark-elevated transition-colors group"
            >
              <span className={item.color}>{item.icon}</span>
              <span className="text-sm font-medium text-stone-200 group-hover:text-neon-orange transition-colors">
                {item.label}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-dark-muted ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
