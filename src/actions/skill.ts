"use server";

import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  category: z.string().min(1),
  skillsList: z.string().min(1),
});

export async function createSkill(formData: FormData) {
  const parsed = schema.safeParse({
    category: formData.get("category"),
    skillsList: formData.get("skillsList"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(skills).values({
    id: crypto.randomUUID(),
    category: parsed.data.category,
    skillsList: parsed.data.skillsList,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  await db.delete(skills).where(eq(skills.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateSkill(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    category: formData.get("category"),
    skillsList: formData.get("skillsList"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(skills)
    .set({
      category: parsed.data.category,
      skillsList: parsed.data.skillsList,
    })
    .where(eq(skills.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
}
