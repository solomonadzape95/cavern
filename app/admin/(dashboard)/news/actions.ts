"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { news, newsKind } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getSlug } from "@/lib/forms";

const postSchema = z.object({
  slug: z
    .string()
    .min(1, "Add a title or page URL so we can build a link"),
  title: z.string().trim().min(1, "Title is required"),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  kind: z.enum(newsKind.enumValues),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
});

function parsePost(formData: FormData) {
  return postSchema.parse({
    slug: getSlug(formData),
    title: formData.get("title"),
    date: formData.get("date"),
    kind: formData.get("kind"),
    excerpt: formData.get("excerpt"),
  });
}

function revalidateNews() {
  revalidatePath("/news");
  updateTag("news");
}

export async function createPost(formData: FormData) {
  await requirePermission("news");
  const data = parsePost(formData);

  await db.insert(news).values(data);

  revalidateNews();
  redirect("/admin/news");
}

export async function updatePost(id: string, formData: FormData) {
  await requirePermission("news");
  const data = parsePost(formData);

  await db.update(news).set(data).where(eq(news.id, id));

  revalidateNews();
  redirect("/admin/news");
}

export async function deletePost(id: string) {
  await requirePermission("news");

  await db.delete(news).where(eq(news.id, id));

  revalidateNews();
  redirect("/admin/news");
}
