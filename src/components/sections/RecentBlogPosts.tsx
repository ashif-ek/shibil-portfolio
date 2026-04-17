"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

// In a real environment, you'd fetch this from your internal MDX library.
// For now, I'll mock the top posts to ensure the homepage UI is complete.
interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  category: string | null;
  excerpt: string | null;
}

export default function RecentBlogPosts({ data }: { data: BlogPostData[] }) {
  if (!data?.length) return null;

  return (
    <section id="blog" className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Latest Marketing <span className="text-blue-500">Insights</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Practical strategies and industry and insights to help you stay ahead in the
              ever-evolving digital landscape.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:opacity-80 transition-all group"
          >
            Visit Full Blog{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((post: BlogPostData, index: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-blue-500/50 transition-all relative flex flex-col shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="p-2 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                </span>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  {post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{post.excerpt}</p>

              <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60 font-medium">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-foreground text-sm font-bold flex items-center gap-1 group/btn"
                  aria-label={`Read complete article: ${post.title}`}
                >
                  Read Review{" "}
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Empty state placeholder for more posts */}
          <div className="hidden lg:flex p-8 rounded-3xl border border-dashed border-border items-center justify-center text-center">
            <p className="text-muted-foreground/60 text-sm max-w-[150px]">
              More technical guides and case studies arriving weekly.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}
