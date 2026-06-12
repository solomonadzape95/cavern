import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers, adminPermissions, type AdminUser, type AdminResource } from "@/db/schema";

export type AdminWithPermissions = AdminUser & { permissions: AdminResource[] };

export async function getAdminUsers(): Promise<AdminWithPermissions[]> {
  const users = await db.select().from(adminUsers).orderBy(asc(adminUsers.createdAt));
  const permissionRows = await db.select().from(adminPermissions);

  const byUser = new Map<string, AdminResource[]>();
  for (const row of permissionRows) {
    byUser.set(row.adminUserId, [...(byUser.get(row.adminUserId) ?? []), row.resource]);
  }

  return users.map((user) => ({ ...user, permissions: byUser.get(user.id) ?? [] }));
}

export async function getAdminUserById(id: string): Promise<AdminWithPermissions | undefined> {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  if (!user) return undefined;

  const permissionRows = await db
    .select()
    .from(adminPermissions)
    .where(eq(adminPermissions.adminUserId, id));

  return { ...user, permissions: permissionRows.map((row) => row.resource) };
}
