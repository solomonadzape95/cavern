"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { adminUsers, adminPermissions, adminResource, type AdminResource } from "@/db/schema";
import { requireSuperadmin } from "@/lib/auth/dal";
import { getOptionalString } from "@/lib/forms";

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
});

function parsePermissions(formData: FormData): AdminResource[] {
  const submitted = formData.getAll("permissions").map(String);
  return adminResource.enumValues.filter((resource) => submitted.includes(resource));
}

export async function inviteAdmin(formData: FormData) {
  await requireSuperadmin();

  const { email } = inviteSchema.parse({ email: formData.get("email") });
  const name = getOptionalString(formData, "name") ?? null;
  const permissions = parsePermissions(formData);

  const [admin] = await db
    .insert(adminUsers)
    .values({ email, name, role: "admin" })
    .returning();

  if (permissions.length) {
    await db
      .insert(adminPermissions)
      .values(permissions.map((resource) => ({ adminUserId: admin.id, resource })));
  }

  // Sign-up is invite-only — send the new admin a Clerk invitation email so
  // they can create an account (with Google or email) even though public
  // sign-up is restricted. If they already have a Clerk account, this throws
  // and we fall back to email-based linking on their next sign-in.
  try {
    const client = await clerkClient();
    await client.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: "/admin/sign-in",
      ignoreExisting: true,
    });
  } catch {
    // Already a Clerk user, or already invited — getCurrentAdmin() links by
    // email on their next sign-in either way.
  }

  redirect("/admin/users");
}

export async function updateAdminAccess(id: string, formData: FormData) {
  await requireSuperadmin();

  const name = getOptionalString(formData, "name") ?? null;
  const permissions = parsePermissions(formData);

  await db.update(adminUsers).set({ name }).where(eq(adminUsers.id, id));

  await db.delete(adminPermissions).where(eq(adminPermissions.adminUserId, id));
  if (permissions.length) {
    await db
      .insert(adminPermissions)
      .values(permissions.map((resource) => ({ adminUserId: id, resource })));
  }

  redirect("/admin/users");
}

export async function deleteAdmin(id: string) {
  const me = await requireSuperadmin();
  if (id === me.id) redirect("/admin/users");

  await db.delete(adminUsers).where(eq(adminUsers.id, id));
  redirect("/admin/users");
}
