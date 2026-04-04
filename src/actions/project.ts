"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1),
  client: z.string().optional(),
  tags: z.string().optional(),
  problem: z.string().optional(),
  strategy: z.string().optional(),
  execution: z.string().optional(),
  result: z.string().optional(),
  description: z.string().optional(),
});

export async function createProject(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    client: formData.get("client"),
    tags: formData.get("tags"),
    problem: formData.get("problem"),
    strategy: formData.get("strategy"),
    execution: formData.get("execution"),
    result: formData.get("result"),
    description: formData.get("description"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(projects).values({
    id: crypto.randomUUID(),
    title: parsed.data.title,
    client: parsed.data.client,
    tags: parsed.data.tags,
    problem: parsed.data.problem,
    strategy: parsed.data.strategy,
    execution: parsed.data.execution,
    result: parsed.data.result,
    description: parsed.data.description,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProject(id: string) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateProject(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    client: formData.get("client"),
    tags: formData.get("tags"),
    problem: formData.get("problem"),
    strategy: formData.get("strategy"),
    execution: formData.get("execution"),
    result: formData.get("result"),
    description: formData.get("description"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(projects)
    .set({
      title: parsed.data.title,
      client: parsed.data.client,
      tags: parsed.data.tags,
      problem: parsed.data.problem,
      strategy: parsed.data.strategy,
      execution: parsed.data.execution,
      result: parsed.data.result,
      description: parsed.data.description,
    })
    .where(eq(projects.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
}
