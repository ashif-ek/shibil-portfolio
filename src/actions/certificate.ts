"use server";

import { db } from "@/lib/db";
import { certificates } from "@/lib/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const schema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().optional(),
  link: z.string().optional(),
  icon: z.string().optional(),
});

export async function createCertificate(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    date: formData.get("date"),
    link: formData.get("link"),
    icon: formData.get("icon"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(certificates).values({
    id: crypto.randomUUID(),
    title: parsed.data.title,
    issuer: parsed.data.issuer,
    date: parsed.data.date,
    link: parsed.data.link,
    icon: parsed.data.icon,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteCertificate(id: string) {
  await db.delete(certificates).where(eq(certificates.id, id));
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCertificate(id: string, formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    date: formData.get("date"),
    link: formData.get("link"),
    icon: formData.get("icon"),
  });

  if (!parsed.success) throw new Error("Invalid input");

  await db
    .update(certificates)
    .set({
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      date: parsed.data.date,
      link: parsed.data.link,
      icon: parsed.data.icon,
    })
    .where(eq(certificates.id, id));

  revalidatePath("/admin");
  revalidatePath("/");
}
