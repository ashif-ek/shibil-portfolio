import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SEO & Performance Marketing Insights",
  description: "Read the latest thoughts on SEO, Meta Ads, and Growth Strategies.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Growth <span className="text-blue-500">Insights</span>
        </h1>
        <p className="text-gray-400 text-lg mb-16">
          Tactical guides, case studies, and modern strategies to scale your business online.
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-500 italic">More insights coming soon...</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-blue-400 text-sm font-mono tracking-wide px-3 py-1 bg-blue-500/10 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-zinc-500 text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
