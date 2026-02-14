'use client';

import { useState, useEffect } from 'react';
import { Beer, Mail, Check } from 'lucide-react';

type ModalState = 'loading' | 'birthday' | 'email' | 'denied' | 'closed';

const months = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
  { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

function getDaysInMonth(month: number, year: number): number {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate();
}

function calculateAge(birthday: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

export default function AgeVerificationModal() {
  const [state, setState] = useState<ModalState>('loading');

  // Birthday fields
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  // Email fields
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ageVerified');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.verified) {
          setState('closed');
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    setState('birthday');
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (state !== 'closed' && state !== 'loading') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state]);

  const daysInMonth = getDaysInMonth(month, year || currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isBirthdayComplete = month > 0 && day > 0 && year > 0;

  const handleVerifyAge = () => {
    if (!isBirthdayComplete) return;

    const birthday = new Date(year, month - 1, day);
    const age = calculateAge(birthday);

    if (age >= 21) {
      setState('email');
    } else {
      setState('denied');
    }
  };

  const handleEnterSite = async () => {
    const birthdayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Save to localStorage
    localStorage.setItem('ageVerified', JSON.stringify({
      verified: true,
      birthday: birthdayStr,
      verifiedAt: new Date().toISOString(),
    }));

    // Send to API
    try {
      await fetch('/everythingbeer/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthday: birthdayStr,
          email: email.trim() || undefined,
          optIn: email.trim() ? optIn : false,
        }),
      });
    } catch {
      // Don't block entry if API fails
    }

    setState('closed');
  };

  // Don't render anything while checking localStorage or if already verified
  if (state === 'loading' || state === 'closed') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-dark-surface border border-dark-border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-neon-red to-neon-orange p-6 text-center">
          <Beer className="w-10 h-10 text-white mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">
            Welcome to EverythingBeer.com
          </h2>
          <p className="text-amber-100 text-sm mt-1">
            Your source for everything beer.
          </p>
        </div>

        <div className="p-6">
          {/* ─── State: Birthday Entry ─── */}
          {state === 'birthday' && (
            <>
              <p className="text-amber-50 font-bold text-center mb-6">
                You must be 21 years or older to view this site. Please verify your age.
              </p>

              {/* Birthday Dropdowns */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <label className="block text-xs text-dark-muted mb-1.5">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-dark-elevated border border-dark-border rounded-lg text-amber-50 text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                  >
                    <option value={0}>Month</option>
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-dark-muted mb-1.5">Day</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-dark-elevated border border-dark-border rounded-lg text-amber-50 text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                  >
                    <option value={0}>Day</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-dark-muted mb-1.5">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-dark-elevated border border-dark-border rounded-lg text-amber-50 text-sm focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                  >
                    <option value={0}>Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleVerifyAge}
                disabled={!isBirthdayComplete}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-neon-red to-neon-orange hover:from-neon-orange hover:to-neon-red transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Verify Age
              </button>
            </>
          )}

          {/* ─── State: Email Capture ─── */}
          {state === 'email' && (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-amber-50 font-semibold">Age Verified!</p>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-amber-50 mb-2">
                  Email <span className="text-dark-muted font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-elevated border border-dark-border rounded-lg text-amber-50 placeholder:text-dark-muted text-sm focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Opt-in Checkbox */}
              <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={optIn}
                    onChange={(e) => setOptIn(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    optIn
                      ? 'bg-neon-orange border-neon-orange'
                      : 'bg-dark-elevated border-dark-border group-hover:border-dark-muted'
                  }`}>
                    {optIn && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-xs text-dark-muted leading-relaxed">
                  Yes, I would love to be part of the EverythingBeer email blast. This includes
                  updates and promotional information (we promise not to sell or give your
                  information to anyone).
                </span>
              </label>

              <button
                onClick={handleEnterSite}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-neon-red to-neon-orange hover:from-neon-orange hover:to-neon-red transition-all"
              >
                Enter Site
              </button>
            </>
          )}

          {/* ─── State: Denied ─── */}
          {state === 'denied' && (
            <div className="text-center py-4">
              <p className="text-neon-red font-semibold text-lg mb-2">
                Sorry, you must be 21 or older to visit this site.
              </p>
              <p className="text-dark-muted text-sm">
                Please come back when you are of legal drinking age.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
