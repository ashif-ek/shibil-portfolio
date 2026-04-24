import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  const posts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  const post = posts[0];

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.substring(0, 160),
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author || "Shibil S"],
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  const post = posts[0];

  if (!post) {
    notFound();
  }

  const articleSchema: Article = {
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content?.substring(0, 160),
    author: {
      "@type": "Person",
      name: post.author || "Shibil S",
    },
    datePublished: post.publishedAt?.toISOString(),
    image: post.imageUrl || undefined,
  };

  return (
    <article className="min-h-screen bg-black pt-32 pb-24">
      <JsonLd schema={{ "@context": "https://schema.org", ...articleSchema }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <header className="mb-12 border-b border-zinc-800 pb-12">
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <span className="text-blue-400 font-mono tracking-widest text-xs uppercase px-3 py-1 bg-blue-500/10 rounded-full">
              {post.category}
            </span>
            <span className="text-zinc-600 text-sm">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }) : post.date}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <User className="w-3.5 h-3.5" />
              {post.author || "Shibil S"}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed italic border-l-4 border-blue-500/30 pl-6">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.imageUrl && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-zinc-800">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="prose prose-invert prose-blue max-w-none prose-headings:text-white prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-blue-400">
          <MDXRemote source={post.content || ""} />
        </div>
      </div>
    </article>
  );
}
