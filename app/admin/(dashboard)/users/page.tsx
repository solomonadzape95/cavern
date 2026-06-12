import Link from "next/link";
import { requireSuperadmin } from "@/lib/auth/dal";
import { getAdminUsers } from "@/lib/data/admins";
import { RESOURCE_NAV } from "@/lib/admin/nav";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAdmin } from "./actions";

export default async function AdminUsersPage() {
  const me = await requireSuperadmin();
  const items = await getAdminUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">Admins</h1>
          <p className="mt-1 text-canvas/60">People who can sign in and manage this site.</p>
        </div>
        <Link href="/admin/users/new" className="label bg-moss px-4 py-2 text-paper">
          Invite admin
        </Link>
      </div>

      <DataTable
        items={items}
        columns={[
          { header: "Email", cell: (a) => a.email },
          { header: "Name", cell: (a) => a.name ?? "—" },
          { header: "Role", cell: (a) => a.role },
          {
            header: "Access",
            cell: (a) =>
              a.role === "superadmin"
                ? "All"
                : a.permissions.length
                  ? RESOURCE_NAV.filter((item) => a.permissions.includes(item.resource))
                      .map((item) => item.label)
                      .join(", ")
                  : "None",
          },
          { header: "Status", cell: (a) => (a.clerkUserId ? "Active" : "Invited") },
        ]}
        rowActions={(a) => (
          <div className="flex items-center justify-end gap-4">
            <Link href={`/admin/users/${a.id}`} className="label text-olive transition-colors hover:text-moss">
              Edit
            </Link>
            {a.id !== me.id && <DeleteButton action={deleteAdmin.bind(null, a.id)} />}
          </div>
        )}
      />
    </div>
  );
}
