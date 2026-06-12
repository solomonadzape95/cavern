"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { SINGLETON_ID } from "@/lib/data/site";
import { requirePermission } from "@/lib/auth/dal";
import { getGroupList } from "@/lib/forms";

const siteSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  short: z.string().trim().min(1, "Short name is required"),
  tagline: z.string().trim().min(1, "Tagline is required"),
  blurb: z.string().trim().min(1, "Blurb is required"),
  email: z.string().trim().min(1, "Email is required"),
  pressEmail: z.string().trim().min(1, "Press email is required"),
  location: z.string().trim().min(1, "Location is required"),
  founded: z.coerce.number().int(),
});

function parseSite(formData: FormData) {
  const fields = siteSchema.parse({
    name: formData.get("name"),
    short: formData.get("short"),
    tagline: formData.get("tagline"),
    blurb: formData.get("blurb"),
    email: formData.get("email"),
    pressEmail: formData.get("pressEmail"),
    location: formData.get("location"),
    founded: formData.get("founded"),
  });

  return {
    ...fields,
    socials: getGroupList<{ label: string; href: string; handle: string }>(
      formData,
      "socials",
      ["label", "href", "handle"],
    ),
  };
}

export async function updateSiteSettings(formData: FormData) {
  await requirePermission("site");
  const data = parseSite(formData);

  await db
    .insert(siteSettings)
    .values({ id: SINGLETON_ID, ...data })
    .onConflictDoUpdate({ target: siteSettings.id, set: data });

  revalidatePath("/", "layout");
  redirect("/admin/site");
}
