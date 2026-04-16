"use server";

import { db } from "@/lib/db";
import { certificates } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
});

export async function createCertificate(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      issuer: formData.get("issuer"),
      date: formData.get("date"),
      link: formData.get("link"),
      icon: formData.get("icon"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db.insert(certificates).values({
      id: crypto.randomUUID(),
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      date: parsed.data.date || null,
      link: parsed.data.link || null,
      icon: parsed.data.icon || null,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to validate credential" };
  }
}

export async function deleteCertificate(id: string) {
  try {
    await db.delete(certificates).where(eq(certificates.id, id));
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete certificate" };
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      issuer: formData.get("issuer"),
      date: formData.get("date"),
      link: formData.get("link"),
      icon: formData.get("icon"),
    };

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }

    await db
      .update(certificates)
      .set({
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        date: parsed.data.date || null,
        link: parsed.data.link || null,
        icon: parsed.data.icon || null,
      })
      .where(eq(certificates.id, id));

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update certificate" };
  }
}
