'use client';

import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform hover:scale-105"
      >
        {/* Beer mug base */}
        <rect
          x="8"
          y="12"
          width="24"
          height="32"
          rx="4"
          fill="url(#beerGradient)"
          stroke="#92400e"
          strokeWidth="2"
        />

        {/* Beer liquid */}
        <rect
          x="10"
          y="16"
          width="20"
          height="26"
          rx="2"
          fill="url(#liquidGradient)"
        />

        {/* Foam bubbles */}
        <circle cx="14" cy="14" r="3" fill="#fef3c7" />
        <circle cx="20" cy="12" r="4" fill="#fef3c7" />
        <circle cx="26" cy="13" r="3.5" fill="#fef3c7" />
        <circle cx="17" cy="10" r="2.5" fill="#fffbeb" />
        <circle cx="23" cy="9" r="2" fill="#fffbeb" />

        {/* Mug handle */}
        <path
          d="M32 20 C40 20, 42 24, 42 30 C42 36, 40 40, 32 40"
          stroke="#92400e"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Highlight */}
        <rect
          x="12"
          y="20"
          width="3"
          height="16"
          rx="1.5"
          fill="rgba(255,255,255,0.3)"
        />

        {/* Bubbles in beer */}
        <circle cx="18" cy="30" r="1" fill="rgba(255,255,255,0.5)" />
        <circle cx="22" cy="35" r="0.8" fill="rgba(255,255,255,0.4)" />
        <circle cx="15" cy="38" r="0.6" fill="rgba(255,255,255,0.3)" />
        <circle cx="25" cy="28" r="0.7" fill="rgba(255,255,255,0.4)" />

        <defs>
          <linearGradient id="beerGradient" x1="8" y1="12" x2="32" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fcd34d" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="liquidGradient" x1="10" y1="16" x2="10" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-amber-600">Everything</span>
            <span className="text-brown-800 dark:text-amber-200">Beer</span>
          </span>
          <span className="text-xs text-brown-600 dark:text-amber-300/70 tracking-wider uppercase">
            Discover. Compare. Enjoy.
          </span>
        </div>
      )}
    </Link>
  );
}
