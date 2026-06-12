import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getTeam } from "@/lib/data/team";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteMember } from "./actions";

export default async function AdminTeamPage() {
  await requirePermission("team");
  const items = await getTeam();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">Team</h1>
          <p className="mt-1 text-canvas/60">The people featured on your About page.</p>
        </div>
        <Link href="/admin/team/new" className="label bg-moss px-4 py-2 text-paper">
          New member
        </Link>
      </div>

      <DataTable
        items={items}
        columns={[
          { header: "Name", cell: (m) => m.name },
          { header: "Role", cell: (m) => m.role },
        ]}
        rowActions={(m) => (
          <div className="flex items-center justify-end gap-4">
            <Link href={`/admin/team/${m.id}`} className="label text-olive transition-colors hover:text-moss">
              Edit
            </Link>
            <DeleteButton action={deleteMember.bind(null, m.id)} />
          </div>
        )}
      />
    </div>
  );
}
