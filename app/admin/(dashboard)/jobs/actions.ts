"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getStringList, getOptionalString } from "@/lib/forms";

const jobSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().trim().min(1, "Title is required"),
  discipline: z.string().trim().min(1, "Discipline is required"),
  type: z.string().trim().min(1, "Type is required"),
  location: z.string().trim().min(1, "Location is required"),
  blurb: z.string().trim().min(1, "Blurb is required"),
});

function parseJob(formData: FormData) {
  const fields = jobSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    discipline: formData.get("discipline"),
    type: formData.get("type"),
    location: formData.get("location"),
    blurb: formData.get("blurb"),
  });

  return {
    ...fields,
    formLink: getOptionalString(formData, "formLink") ?? null,
    responsibilities: getStringList(formData, "responsibilities"),
    requirements: getStringList(formData, "requirements"),
  };
}

function revalidateJobs(slug?: string) {
  revalidatePath("/jobs");
  revalidatePath("/");
  if (slug) revalidatePath(`/jobs/${slug}`);
  updateTag("jobs");
}

export async function createJob(formData: FormData) {
  await requirePermission("jobs");
  const data = parseJob(formData);

  await db.insert(jobs).values(data);

  revalidateJobs(data.slug);
  redirect("/admin/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  await requirePermission("jobs");
  const data = parseJob(formData);

  await db.update(jobs).set(data).where(eq(jobs.id, id));

  revalidateJobs(data.slug);
  redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
  await requirePermission("jobs");

  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  await db.delete(jobs).where(eq(jobs.id, id));

  revalidateJobs(existing?.slug);
  redirect("/admin/jobs");
}
