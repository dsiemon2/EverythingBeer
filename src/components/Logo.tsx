'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: { width: 48, height: 48 },
  md: { width: 72, height: 72 },
  lg: { width: 120, height: 120 },
  xl: { width: 160, height: 160 },
};

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/everythingbeer/images/logo.png"
        alt="EverythingBeer"
        width={width}
        height={height}
        className="transition-transform hover:scale-105"
        priority
      />
    </Link>
  );
}
