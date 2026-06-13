"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { team } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getGroupList } from "@/lib/forms";
import { uploadImage } from "@/lib/storage";

const memberSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  bio: z.string().trim().min(1, "Bio is required"),
});

function parseMember(formData: FormData) {
  const fields = memberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio"),
  });

  return {
    ...fields,
    links: getGroupList<{ label: string; href: string }>(formData, "links", [
      "label",
      "href",
    ]),
  };
}

async function uploadMemberImage(formData: FormData): Promise<string | undefined> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return undefined;
  return uploadImage(file, "team");
}

function revalidateTeam() {
  revalidatePath("/");
  revalidatePath("/about");
  updateTag("team");
}

export async function createMember(formData: FormData) {
  await requirePermission("team");
  const data = parseMember(formData);
  const image = await uploadMemberImage(formData);

  await db.insert(team).values({ ...data, image: image ?? null });

  revalidateTeam();
  redirect("/admin/team");
}

export async function updateMember(id: string, formData: FormData) {
  await requirePermission("team");
  const data = parseMember(formData);
  const image = await uploadMemberImage(formData);

  await db
    .update(team)
    .set({ ...data, ...(image && { image }) })
    .where(eq(team.id, id));

  revalidateTeam();
  redirect("/admin/team");
}

export async function deleteMember(id: string) {
  await requirePermission("team");

  await db.delete(team).where(eq(team.id, id));

  revalidateTeam();
  redirect("/admin/team");
}
