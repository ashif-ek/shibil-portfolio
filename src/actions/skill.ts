"use server";

import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  skillsList: z.string().min(1, "Skills list is required"),
});

export async function createSkill(formData: FormData) {
  try {
    const rawData = {
      category: formData.get("category") as string,
      skillsList: formData.get("skillsList") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db.insert(skills).values({
      id: crypto.randomUUID(),
      category: parsed.data.category,
      skillsList: parsed.data.skillsList,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to sync skill set" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete skill" };
  }
}

export async function updateSkill(id: string, formData: FormData) {
  try {
    const rawData = {
      category: formData.get("category") as string,
      skillsList: formData.get("skillsList") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db
      .update(skills)
      .set({
        category: parsed.data.category,
        skillsList: parsed.data.skillsList,
      })
      .where(eq(skills.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update skill" };
  }
}
