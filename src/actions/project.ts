"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  client: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  problem: z.string().nullable().optional(),
  strategy: z.string().nullable().optional(),
  execution: z.string().nullable().optional(),
  result: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export async function createProject(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      client: formData.get("client"),
      tags: formData.get("tags"),
      problem: formData.get("problem"),
      strategy: formData.get("strategy"),
      execution: formData.get("execution"),
      result: formData.get("result"),
      description: formData.get("description"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db.insert(projects).values({
      id: crypto.randomUUID(),
      title: parsed.data.title,
      client: parsed.data.client || null,
      tags: parsed.data.tags || null,
      problem: parsed.data.problem || null,
      strategy: parsed.data.strategy || null,
      execution: parsed.data.execution || null,
      result: parsed.data.result || null,
      description: parsed.data.description || null,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to create project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      client: formData.get("client"),
      tags: formData.get("tags"),
      problem: formData.get("problem"),
      strategy: formData.get("strategy"),
      execution: formData.get("execution"),
      result: formData.get("result"),
      description: formData.get("description"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db
      .update(projects)
      .set({
        title: parsed.data.title,
        client: parsed.data.client || null,
        tags: parsed.data.tags || null,
        problem: parsed.data.problem || null,
        strategy: parsed.data.strategy || null,
        execution: parsed.data.execution || null,
        result: parsed.data.result || null,
        description: parsed.data.description || null,
      })
      .where(eq(projects.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update project" };
  }
}
