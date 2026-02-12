import Link from 'next/link';

interface HomebrewHubCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function HomebrewHubCard({ title, description, href, icon, badge }: HomebrewHubCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-dark-surface border border-dark-border rounded-2xl p-6 hover:border-amber-500/50 hover:bg-dark-elevated transition-all duration-300"
    >
      {badge && (
        <span className="absolute top-4 right-4 bg-neon-orange/20 text-neon-orange text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-amber-50 group-hover:text-amber-400 transition-colors mb-1">
            {title}
          </h3>
          <p className="text-sm text-dark-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Explore</span>
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
