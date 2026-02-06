'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, ArrowLeft, Clock, Newspaper } from 'lucide-react';
import { getAuthorById } from '@/data/authors';
import { getBlogPostsByAuthor } from '@/data/blog';
import { getBlogImage } from '@/lib/images';

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

const categoryColors: Record<string, string> = {
  news: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  reviews: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  culture: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  events: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  opinion: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
  industry: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
};

const categoryLabels: Record<string, string> = {
  news: 'News',
  reviews: 'Reviews',
  culture: 'Culture',
  events: 'Events',
  opinion: 'Opinion',
  industry: 'Industry',
};

export default function AuthorPage({ params }: AuthorPageProps) {
  const { id } = use(params);
  const author = getAuthorById(id);

  if (!author) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <User className="w-20 h-20 text-brown-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            Author Not Found
          </h1>
          <p className="text-brown-600 dark:text-brown-300 mb-8">
            We couldn&apos;t find the author you&apos;re looking for.
          </p>
          <Link
            href="/beer-fyi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beer FYI
          </Link>
        </div>
      </div>
    );
  }

  const authorPosts = getBlogPostsByAuthor(author.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-amber-50 dark:bg-brown-900 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/beer-fyi" className="text-amber-600 hover:text-amber-700">
              Beer FYI
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-600 dark:text-brown-300">{author.name}</span>
          </div>
        </div>
      </div>

      {/* Author Profile Header */}
      <section className="py-12 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-amber-700 dark:text-amber-300" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-1">
                {author.name}
              </h1>
              <p className="text-amber-600 dark:text-amber-400 font-medium mb-3">
                {author.role}
              </p>
              <p className="text-brown-600 dark:text-brown-300 max-w-2xl">
                {author.bio}
              </p>
              <p className="mt-3 text-sm text-brown-400">
                {authorPosts.length} article{authorPosts.length !== 1 ? 's' : ''} published
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-8">
            Articles by {author.name}
          </h2>

          {authorPosts.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="w-12 h-12 text-brown-300 mx-auto mb-4" />
              <p className="text-brown-600 dark:text-brown-300">
                No articles published yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
                <Link key={post.id} href={`/beer-fyi/${post.slug}`}>
                  <article className="beer-card bg-white dark:bg-brown-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={getBlogImage(post.category, post.slug)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                          {categoryLabels[post.category] || post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg text-brown-800 dark:text-amber-100 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-brown-600 dark:text-brown-300 text-sm line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-brown-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.read_time} min read
                        </span>
                        <span>
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Link
          href="/beer-fyi"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Beer FYI
        </Link>
      </div>
    </div>
  );
}
