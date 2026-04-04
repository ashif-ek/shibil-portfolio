"use server";

import { db } from "@/lib/db";
import { experiences } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  period: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

export async function createExperience(formData: FormData) {
  const parsed = schema.safeParse({
    role: formData.get("role"),
    company: formData.get("company"),
    period: formData.get("period"),
    location: formData.get("location"),
    description: formData.get("description"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(experiences).values({
    id: crypto.randomUUID(),
    role: parsed.data.role,
    company: parsed.data.company,
    period: parsed.data.period,
    location: parsed.data.location,
    description: parsed.data.description,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteExperience(id: string) {
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateExperience(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    role: formData.get("role"),
    company: formData.get("company"),
    period: formData.get("period"),
    location: formData.get("location"),
    description: formData.get("description"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(experiences)
    .set({
      role: parsed.data.role,
      company: parsed.data.company,
      period: parsed.data.period,
      location: parsed.data.location,
      description: parsed.data.description,
    })
    .where(eq(experiences.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
}
