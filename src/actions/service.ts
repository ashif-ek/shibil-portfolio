"use server";

import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1, "Service name is required"),
  icon: z.string().min(1, "Icon ID is required"),
  problem: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  outcome: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
});

export async function createService(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      icon: formData.get("icon") as string,
      problem: formData.get("problem") as string,
      solution: formData.get("solution") as string,
      outcome: formData.get("outcome") as string,
      link: formData.get("link") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db.insert(services).values({
      id: crypto.randomUUID(),
      title: parsed.data.title,
      icon: parsed.data.icon,
      problem: parsed.data.problem || null,
      solution: parsed.data.solution || null,
      outcome: parsed.data.outcome || null,
      link: parsed.data.link || null,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to register service" };
  }
}

export async function deleteService(id: string) {
  try {
    await db.delete(services).where(eq(services.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete service" };
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      icon: formData.get("icon") as string,
      problem: formData.get("problem") as string,
      solution: formData.get("solution") as string,
      outcome: formData.get("outcome") as string,
      link: formData.get("link") as string,
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await db
      .update(services)
      .set({
        title: parsed.data.title,
        icon: parsed.data.icon,
        problem: parsed.data.problem || null,
        solution: parsed.data.solution || null,
        outcome: parsed.data.outcome || null,
        link: parsed.data.link || null,
      })
      .where(eq(services.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update service" };
  }
}
