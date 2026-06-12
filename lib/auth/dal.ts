import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, adminPermissions, type AdminResource, type AdminRole } from "@/db/schema";

export type CurrentAdmin = {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  role: AdminRole;
  permissions: AdminResource[];
};

function superadminEmails(): string[] {
  return (process.env.SUPERADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Resolves the signed-in Clerk user to an admin record, linking or
 * bootstrapping it on first sign-in. Returns null if the user is signed in
 * but isn't (and shouldn't become) an admin.
 */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin | null> => {
  const { userId } = await auth();
  if (!userId) return null;

  let [row] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.clerkUserId, userId))
    .limit(1);

  if (!row) {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
    if (!email) return null;

    const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null;

    // A superadmin may have pre-created this admin by email before they ever signed in.
    const [invited] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    if (invited) {
      [row] = await db
        .update(adminUsers)
        .set({ clerkUserId: userId, name: invited.name ?? name })
        .where(eq(adminUsers.id, invited.id))
        .returning();
    } else if (superadminEmails().includes(email)) {
      [row] = await db
        .insert(adminUsers)
        .values({ clerkUserId: userId, email, name, role: "superadmin" })
        .returning();
    } else {
      return null;
    }
  }

  const permissionRows =
    row.role === "superadmin"
      ? []
      : await db
          .select()
          .from(adminPermissions)
          .where(eq(adminPermissions.adminUserId, row.id));

  return {
    id: row.id,
    clerkUserId: row.clerkUserId!,
    email: row.email,
    name: row.name,
    role: row.role,
    permissions: permissionRows.map((p) => p.resource),
  };
});

export function canAccess(admin: CurrentAdmin, resource: AdminResource): boolean {
  return admin.role === "superadmin" || admin.permissions.includes(resource);
}

/** Redirects to sign-in (or a "no access" page) unless the current user is an admin. */
export async function requireAdmin(): Promise<CurrentAdmin> {
  const { userId } = await auth();
  if (!userId) redirect("/admin/sign-in");

  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/no-access");
  return admin;
}

/** Redirects to the dashboard unless the current admin can access `resource`. */
export async function requirePermission(resource: AdminResource): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  if (!canAccess(admin, resource)) redirect("/admin");
  return admin;
}

/** Redirects to the dashboard unless the current admin is a superadmin. */
export async function requireSuperadmin(): Promise<CurrentAdmin> {
  const admin = await requireAdmin();
  if (admin.role !== "superadmin") redirect("/admin");
  return admin;
}
