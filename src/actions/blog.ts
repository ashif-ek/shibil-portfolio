"use server";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  date: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
});

export async function createBlogPost(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      date: formData.get("date"),
      category: formData.get("category"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db.insert(blogPosts).values({
      id: crypto.randomUUID(),
      title: parsed.data.title,
      slug: parsed.data.slug,
      date: parsed.data.date || null,
      category: parsed.data.category || null,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content || null,
    });

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to deploy article" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete article" };
  }
}

export async function updateBlogPost(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      date: formData.get("date"),
      category: formData.get("category"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db
      .update(blogPosts)
      .set({
        title: parsed.data.title,
        slug: parsed.data.slug,
        date: parsed.data.date || null,
        category: parsed.data.category || null,
        excerpt: parsed.data.excerpt || null,
        content: parsed.data.content || null,
      })
      .where(eq(blogPosts.id, id));

    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update article" };
  }
}
