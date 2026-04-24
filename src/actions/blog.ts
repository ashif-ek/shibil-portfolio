"use server";

import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  category: z.string().nullable().optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  readingTime: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createBlogPost(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      category: formData.get("category") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      readingTime: formData.get("readingTime") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const slug = parsed.data.slug || generateSlug(parsed.data.title);

    await db.insert(blogPosts).values({
      id: crypto.randomUUID(),
      title: parsed.data.title,
      slug: slug,
      category: parsed.data.category || null,
      excerpt: parsed.data.excerpt || null,
      content: parsed.data.content || null,
      author: parsed.data.author || "Shibil S",
      readingTime: parsed.data.readingTime || null,
      imageUrl: parsed.data.imageUrl || null,
      publishedAt: new Date(),
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
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      category: formData.get("category") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      readingTime: formData.get("readingTime") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const slug = parsed.data.slug || generateSlug(parsed.data.title);

    await db
      .update(blogPosts)
      .set({
        title: parsed.data.title,
        slug: slug,
        category: parsed.data.category || null,
        excerpt: parsed.data.excerpt || null,
        content: parsed.data.content || null,
        author: parsed.data.author || "Shibil S",
        readingTime: parsed.data.readingTime || null,
        imageUrl: parsed.data.imageUrl || null,
        updatedAt: new Date(),
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
