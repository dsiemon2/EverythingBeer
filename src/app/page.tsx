'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Lightbulb,
  BookOpen,
  Clock,
  MapPin,
  Play,
  Beer,
  Building2,
  Layers,
  GitCompare,
  ChevronRight,
  Zap,
  Star,
} from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { pintSizedPosts } from '@/data/pint-sized-posts';
import { beerNews, getNewsCategoryLabel } from '@/data/beer-news';
import { videos } from '@/data/videos';
import { guides } from '@/data/guides';
import { getBlogImage, getNewsImage } from '@/lib/images';
import { getAuthorById } from '@/data/authors';

export default function Home() {
  const featuredArticle = blogPosts[0];
  const sidebarArticles = blogPosts.slice(1, 4);
  const latestNews = beerNews.slice(0, 6);
  const randomFacts = pintSizedPosts.slice(0, 6);
  const featuredVideos = videos.slice(0, 4);
  const featuredGuides = guides.slice(0, 3);
  const featuredAuthor = featuredArticle ? getAuthorById(featuredArticle.author_id) : null;

  return (
    <div className="min-h-screen">
      {/* ============================================ */}
      {/* SECTION 1: Featured Article Hero             */}
      {/* ============================================ */}
      <section className="bg-dark-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[420px]">
            {/* Main Featured Article */}
            <div className="lg:col-span-2 relative overflow-hidden">
              <Image
                src={getBlogImage(featuredArticle.category, featuredArticle.slug)}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="hero-overlay absolute inset-0" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
                <div className="max-w-xl">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-neon-red text-white rounded mb-4">
                    {featuredArticle.category}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    <Link href={`/beer-fyi/${featuredArticle.slug}`} className="hover:text-neon-orange transition-colors">
                      {featuredArticle.title}
                    </Link>
                  </h1>
                  <p className="text-stone-300 text-sm md:text-base mb-4 line-clamp-2">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-stone-400">
                    {featuredAuthor && <span>By {featuredAuthor.name}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.read_time} min read
                    </span>
                  </div>
                  <Link
                    href={`/beer-fyi/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-neon-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Article Cards */}
            <div className="hidden lg:flex flex-col">
              {sidebarArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/beer-fyi/${article.slug}`}
                  className="relative flex-1 overflow-hidden group border-l border-b border-dark-border last:border-b-0"
                >
                  <Image
                    src={getBlogImage(article.category, article.slug)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-end h-full p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neon-orange mb-1">
                      {article.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug group-hover:text-neon-blue transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Neon gradient divider */}
        <div className="neon-divider" />
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Pint-Sized Posts Ticker            */}
      {/* ============================================ */}
      <section className="bg-dark-surface py-3 border-b border-dark-border overflow-hidden">
        <div className="flex items-center">
          <div className="flex-shrink-0 px-4 flex items-center gap-2 text-neon-orange font-bold text-sm uppercase tracking-wider border-r border-dark-border pr-4">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Facts</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker flex whitespace-nowrap gap-12 pl-6">
              {[...randomFacts, ...randomFacts].map((fact, i) => (
                <span key={`${fact.id}-${i}`} className="text-sm text-stone-400 inline-flex items-center gap-2">
                  <span>{fact.icon || '🍺'}</span>
                  <span>{fact.fact}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 3: Videos Row (moved up)               */}
      {/* ============================================ */}
      <section className="py-10 bg-dark-surface border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-neon-red to-neon-blue rounded-full" />
              <h2 className="text-2xl font-bold text-white">
                Videos
              </h2>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-neon-blue flex items-center gap-1">
              <Play className="w-3.5 h-3.5" />
              Featured
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredVideos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtube_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="video-thumb rounded-xl aspect-video bg-dark-elevated mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-neon-red rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded">
                      {video.duration}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-stone-100 group-hover:text-neon-blue transition-colors leading-snug mb-1">
                  {video.title}
                </h3>
                <p className="text-xs text-dark-muted">
                  {video.channel}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: Main Content + Sidebar Layout      */}
      {/* ============================================ */}
      <section className="py-10 bg-background dark:bg-dark-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ====== LEFT: Main Content (2/3) ====== */}
            <div className="lg:col-span-2 space-y-12">

              {/* --- Beer News / Breaking Taps --- */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-neon-red to-neon-orange rounded-full" />
                    <h2 className="text-2xl font-bold text-brown-800 dark:text-stone-100">
                      Breaking Taps
                    </h2>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-neon-rust dark:text-neon-orange flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" />
                    Latest News
                  </span>
                </div>

                <div className="space-y-3">
                  {latestNews.map((news) => (
                    <article
                      key={news.id}
                      className="flex gap-4 p-4 bg-white dark:bg-dark-surface rounded-xl border border-amber-100 dark:border-dark-border hover:border-neon-orange/30 dark:hover:border-neon-orange/40 transition-colors group"
                    >
                      {/* News thumbnail */}
                      <div className="hidden sm:block relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={getNewsImage(news.category)}
                          alt={news.headline}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`badge-${news.category} inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white rounded`}>
                            {getNewsCategoryLabel(news.category)}
                          </span>
                          {news.location && (
                            <span className="text-xs text-brown-400 dark:text-dark-muted flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {news.location}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-brown-800 dark:text-stone-100 group-hover:text-neon-rust dark:group-hover:text-neon-orange transition-colors text-sm md:text-base leading-snug">
                          {news.headline}
                        </h3>
                        <p className="text-sm text-brown-500 dark:text-stone-400 mt-1 line-clamp-2">
                          {news.summary}
                        </p>
                        <time className="text-xs text-brown-400 dark:text-dark-muted mt-2 block">
                          {new Date(news.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* --- Latest from Beer FYI --- */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-neon-blue to-neon-orange rounded-full" />
                    <h2 className="text-2xl font-bold text-brown-800 dark:text-stone-100">
                      Latest from Beer FYI
                    </h2>
                  </div>
                  <Link href="/beer-fyi" className="text-neon-rust dark:text-neon-blue hover:text-neon-red text-sm font-medium flex items-center gap-1 transition-colors">
                    All Articles <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {blogPosts.slice(0, 4).map((post) => {
                    const author = getAuthorById(post.author_id);
                    return (
                      <Link key={post.id} href={`/beer-fyi/${post.slug}`}>
                        <article className="beer-card bg-white dark:bg-dark-surface rounded-xl overflow-hidden border border-amber-100 dark:border-dark-border h-full">
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={getBlogImage(post.category, post.slug)}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neon-red/90 text-white rounded">
                              {post.category}
                            </span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-brown-800 dark:text-stone-100 text-sm leading-snug mb-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-brown-500 dark:text-stone-400 line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-brown-400 dark:text-dark-muted">
                              {author && <span>{author.name}</span>}
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.read_time} min
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* --- Guides --- */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-neon-orange to-neon-rust rounded-full" />
                    <h2 className="text-2xl font-bold text-brown-800 dark:text-stone-100">
                      Beer Guides
                    </h2>
                  </div>
                  <Link href="/guides" className="text-neon-rust dark:text-neon-blue hover:text-neon-red text-sm font-medium flex items-center gap-1 transition-colors">
                    All Guides <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {featuredGuides.map((guide) => (
                    <Link key={guide.id} href={`/guides/${guide.slug}`}>
                      <article className="beer-card bg-white dark:bg-dark-surface rounded-xl p-4 border border-amber-100 dark:border-dark-border h-full">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-5 h-5 text-neon-orange" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neon-rust dark:text-neon-orange">
                            {guide.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-brown-800 dark:text-stone-100 mb-2 leading-snug">
                          {guide.title}
                        </h3>
                        <p className="text-xs text-brown-500 dark:text-stone-400 line-clamp-2 mb-3">
                          {guide.excerpt}
                        </p>
                        <span className="text-xs text-brown-400 dark:text-dark-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.read_time} min read
                        </span>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ====== RIGHT: Sidebar (1/3) ====== */}
            <aside className="space-y-8">

              {/* 1. Newsletter Sidebar Widget (Stay Updated) */}
              <div className="bg-dark-surface rounded-xl p-5 text-center border border-dark-border">
                <h3 className="text-white font-bold text-sm mb-2">Stay Updated</h3>
                <p className="text-stone-400 text-xs mb-4">
                  Weekly beer recs, guides & news in your inbox.
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

              {/* 2. Pint-Sized Posts Sidebar */}
              <div className="bg-white dark:bg-dark-surface rounded-xl border border-amber-100 dark:border-dark-border overflow-hidden">
                <div className="bg-gradient-to-r from-neon-rust to-neon-orange px-4 py-3">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Pint-Sized Posts
                  </h3>
                </div>
                <div className="divide-y divide-amber-100 dark:divide-dark-border">
                  {randomFacts.slice(0, 4).map((fact) => (
                    <div key={fact.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0">{fact.icon || '🍺'}</span>
                        <p className="text-xs text-brown-700 dark:text-stone-300 leading-relaxed">
                          {fact.fact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-amber-100 dark:border-dark-border">
                  <Link
                    href="/pint-sized-posts"
                    className="text-xs font-medium text-neon-rust dark:text-neon-orange hover:text-neon-red flex items-center gap-1 transition-colors"
                  >
                    More Beer Facts <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* 3. Mangy Dog Coffee Ad */}
              <a
                href="https://mangydogcoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-amber-100 dark:border-dark-border hover:border-neon-orange/40 transition-colors group"
              >
                <Image
                  src="/everythingbeer/images/mangy-dog-coffee.png"
                  alt="Mangy Dog Coffee - Coffee With A Bite"
                  width={300}
                  height={300}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                />
              </a>

              {/* 4. Soup Cook Off Sponsor Ad */}
              <a
                href="https://soupcookoff.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-amber-100 dark:border-dark-border hover:border-neon-orange/40 transition-colors group"
              >
                <Image
                  src="/everythingbeer/images/soup-cook-off.png"
                  alt="Soup Cook Off"
                  width={300}
                  height={300}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                />
              </a>

              {/* 5. Quick Explore Tools (bottom) */}
              <div className="bg-white dark:bg-dark-surface rounded-xl border border-amber-100 dark:border-dark-border overflow-hidden">
                <div className="bg-gradient-to-r from-neon-blue to-neon-blue/70 px-4 py-3">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Explore
                  </h3>
                </div>
                <div className="p-3 space-y-1">
                  {[
                    { icon: <Beer className="w-4 h-4" />, label: 'Discover Beers', href: '/beers', color: 'text-neon-orange' },
                    { icon: <Building2 className="w-4 h-4" />, label: 'Find Breweries', href: '/breweries', color: 'text-neon-blue' },
                    { icon: <Layers className="w-4 h-4" />, label: 'Beer Styles', href: '/styles', color: 'text-neon-red' },
                    { icon: <GitCompare className="w-4 h-4" />, label: 'Compare Beers', href: '/compare', color: 'text-neon-rust' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 dark:hover:bg-dark-elevated transition-colors group"
                    >
                      <span className={item.color}>{item.icon}</span>
                      <span className="text-sm font-medium text-brown-700 dark:text-stone-200 group-hover:text-neon-rust dark:group-hover:text-neon-orange transition-colors">
                        {item.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-brown-300 dark:text-dark-muted ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: Comparison CTA Banner              */}
      {/* ============================================ */}
      <section className="py-12 bg-gradient-to-r from-neon-rust via-neon-red to-neon-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Not Sure What to Try Next?
              </h2>
              <p className="text-white/80 max-w-lg">
                Use our comparison tool to find beers similar to ones you love,
                or take the quiz to discover new favorites.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/compare"
                className="px-6 py-3 bg-white text-neon-rust font-bold rounded-xl hover:bg-amber-50 transition-colors text-center text-sm"
              >
                Compare Beers
              </Link>
              <Link
                href="/quiz"
                className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-colors text-center text-sm"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
