"use server";

import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1),
  icon: z.string().min(1),
  problem: z.string().optional(),
  solution: z.string().optional(),
  outcome: z.string().optional(),
  link: z.string().optional(),
});

export async function createService(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    icon: formData.get("icon"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    outcome: formData.get("outcome"),
    link: formData.get("link"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(services).values({
    id: crypto.randomUUID(),
    title: parsed.data.title,
    icon: parsed.data.icon,
    problem: parsed.data.problem,
    solution: parsed.data.solution,
    outcome: parsed.data.outcome,
    link: parsed.data.link,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateService(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    icon: formData.get("icon"),
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    outcome: formData.get("outcome"),
    link: formData.get("link"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(services)
    .set({
      title: parsed.data.title,
      icon: parsed.data.icon,
      problem: parsed.data.problem,
      solution: parsed.data.solution,
      outcome: parsed.data.outcome,
      link: parsed.data.link,
    })
    .where(eq(services.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
}
