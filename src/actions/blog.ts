"use server";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().optional(),
  category: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
});

export async function createBlogPost(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    date: formData.get("date"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(blogPosts).values({
    id: crypto.randomUUID(),
    title: parsed.data.title,
    slug: parsed.data.slug,
    date: parsed.data.date,
    category: parsed.data.category,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
  });

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function deleteBlogPost(id: string) {
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    date: formData.get("date"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(blogPosts)
    .set({
      title: parsed.data.title,
      slug: parsed.data.slug,
      date: parsed.data.date,
      category: parsed.data.category,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
    })
    .where(eq(blogPosts.id, id));

  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
}
