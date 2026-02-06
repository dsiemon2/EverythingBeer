'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Clock, ArrowLeft, Tag, Share2, User, Calendar } from 'lucide-react';
import { getBlogPostBySlug, blogPosts } from '@/data/blog';
import { getAuthorById } from '@/data/authors';
import { getBlogImage } from '@/lib/images';
import ReactMarkdown from 'react-markdown';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
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

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Newspaper className="w-20 h-20 text-brown-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            Article Not Found
          </h1>
          <p className="text-brown-600 dark:text-brown-300 mb-8">
            We couldn&apos;t find the article you&apos;re looking for.
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

  const author = getAuthorById(post.author_id);
  const publishDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-amber-50 dark:bg-brown-900 border-b border-amber-100 dark:border-brown-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/beer-fyi" className="text-amber-600 hover:text-amber-700">
              Beer FYI
            </Link>
            <span className="text-brown-400">/</span>
            <span className="text-brown-600 dark:text-brown-300 truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}
            >
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-brown-500 dark:text-brown-400">
              <Clock className="w-4 h-4" />
              {post.read_time} min read
            </span>
            <span className="flex items-center gap-1 text-sm text-brown-500 dark:text-brown-400">
              <Calendar className="w-4 h-4" />
              {publishDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-brown-800 dark:text-amber-100 mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-brown-600 dark:text-brown-300 mb-6">{post.excerpt}</p>

          {/* Author Card */}
          {author && (
            <Link
              href={`/beer-fyi/author/${author.id}`}
              className="inline-flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-brown-800 border border-amber-200 dark:border-brown-700 hover:border-amber-300 dark:hover:border-brown-600 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center">
                <User className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
              <div>
                <div className="font-semibold text-brown-800 dark:text-amber-100">{author.name}</div>
                <div className="text-sm text-brown-500 dark:text-brown-400">{author.role}</div>
              </div>
            </Link>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-full text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium">
            <Share2 className="w-4 h-4" />
            Share this article
          </button>
        </header>

        {/* Content */}
        <div className="prose prose-amber prose-lg dark:prose-invert max-w-none mb-12">
          <div className="bg-white dark:bg-brown-800 rounded-2xl p-6 md:p-8 border border-amber-100 dark:border-brown-700">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-brown-800 dark:text-amber-100 mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mt-8 mb-4 pb-2 border-b border-amber-200 dark:border-brown-600">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-brown-800 dark:text-amber-100 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-brown-600 dark:text-brown-300 mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-brown-600 dark:text-brown-300 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-brown-600 dark:text-brown-300 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-brown-600 dark:text-brown-300">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-brown-800 dark:text-amber-100">
                    {children}
                  </strong>
                ),
                hr: () => <hr className="my-8 border-amber-200 dark:border-brown-600" />,
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse border border-amber-200 dark:border-brown-600">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-amber-200 dark:border-brown-600 bg-amber-50 dark:bg-brown-700 px-4 py-2 text-left font-semibold text-brown-800 dark:text-amber-100">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-amber-200 dark:border-brown-600 px-4 py-2 text-brown-600 dark:text-brown-300">
                    {children}
                  </td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Author Bio (bottom) */}
        {author && (
          <div className="bg-amber-50 dark:bg-brown-800 rounded-2xl p-6 border border-amber-200 dark:border-brown-700 mb-12">
            <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-4">
              About the Author
            </h3>
            <Link
              href={`/beer-fyi/author/${author.id}`}
              className="flex items-start gap-4 group"
            >
              <div className="w-14 h-14 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-amber-700 dark:text-amber-300" />
              </div>
              <div>
                <div className="font-bold text-brown-800 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {author.name}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                  {author.role}
                </div>
                <p className="text-sm text-brown-600 dark:text-brown-300">{author.bio}</p>
              </div>
            </Link>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-brown-800 dark:text-amber-100 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/beer-fyi/${relatedPost.slug}`}>
                  <div className="beer-card bg-white dark:bg-brown-800 rounded-xl overflow-hidden border border-amber-100 dark:border-brown-700 h-full">
                    <div className="h-32 relative overflow-hidden">
                      <Image
                        src={getBlogImage(relatedPost.category, relatedPost.slug)}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${categoryColors[relatedPost.category] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {categoryLabels[relatedPost.category] || relatedPost.category}
                      </span>
                      <h3 className="font-bold text-brown-800 dark:text-amber-100 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/beer-fyi"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Beer FYI
          </Link>
        </div>
      </article>
    </div>
  );
}
