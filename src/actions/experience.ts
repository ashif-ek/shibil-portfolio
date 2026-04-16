"use server";

import { db } from "@/lib/db";
import { experiences } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Organization is required"),
  period: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export async function createExperience(formData: FormData) {
  try {
    const rawData = {
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db.insert(experiences).values({
      id: crypto.randomUUID(),
      role: parsed.data.role,
      company: parsed.data.company,
      period: parsed.data.period || null,
      location: parsed.data.location || null,
      description: parsed.data.description || null,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to commit experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete experience" };
  }
}

export async function updateExperience(id: string, formData: FormData) {
  try {
    const rawData = {
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db
      .update(experiences)
      .set({
        role: parsed.data.role,
        company: parsed.data.company,
        period: parsed.data.period || null,
        location: parsed.data.location || null,
        description: parsed.data.description || null,
      })
      .where(eq(experiences.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update experience" };
  }
}
