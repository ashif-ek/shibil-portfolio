import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { Article } from "schema-dts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema: Article = {
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    author: {
      "@type": "Person",
      name: post.meta.author,
    },
    datePublished: post.meta.date,
  };

  return (
    <article className="min-h-screen bg-black pt-32 pb-24">
      <JsonLd schema={{ "@context": "https://schema.org", ...articleSchema }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-blue-400 font-mono tracking-wide text-sm">{post.meta.category}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500 text-sm">
              {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {post.meta.title}
          </h1>
          <p className="text-xl text-gray-400">
            {post.meta.description}
          </p>
        </header>
        
        <div className="prose prose-invert prose-blue max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
