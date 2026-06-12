"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { team } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getGroupList, getOptionalString } from "@/lib/forms";

const memberSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  seed: z.string().trim().min(1, "Seed is required"),
  bio: z.string().trim().min(1, "Bio is required"),
});

function parseMember(formData: FormData) {
  const fields = memberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    seed: formData.get("seed"),
    bio: formData.get("bio"),
  });

  return {
    ...fields,
    image: getOptionalString(formData, "image") ?? null,
    links: getGroupList<{ label: string; href: string }>(formData, "links", [
      "label",
      "href",
    ]),
  };
}

function revalidateTeam() {
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createMember(formData: FormData) {
  await requirePermission("team");
  const data = parseMember(formData);

  await db.insert(team).values(data);

  revalidateTeam();
  redirect("/admin/team");
}

export async function updateMember(id: string, formData: FormData) {
  await requirePermission("team");
  const data = parseMember(formData);

  await db.update(team).set(data).where(eq(team.id, id));

  revalidateTeam();
  redirect("/admin/team");
}

export async function deleteMember(id: string) {
  await requirePermission("team");

  await db.delete(team).where(eq(team.id, id));

  revalidateTeam();
  redirect("/admin/team");
}
