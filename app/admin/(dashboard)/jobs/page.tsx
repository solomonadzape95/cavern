import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getJobs } from "@/lib/data/jobs";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteJob } from "./actions";

export default async function AdminJobsPage() {
  await requirePermission("jobs");
  const items = await getJobs();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">Jobs</h1>
          <p className="mt-1 text-canvas/60">Open roles listed on your Jobs page.</p>
        </div>
        <Link href="/admin/jobs/new" className="label bg-moss px-4 py-2 text-paper">
          New job
        </Link>
      </div>

      <DataTable
        items={items}
        columns={[
          { header: "Title", cell: (j) => j.title },
          { header: "Discipline", cell: (j) => j.discipline },
          { header: "Type", cell: (j) => j.type },
          { header: "Location", cell: (j) => j.location },
        ]}
        rowActions={(j) => (
          <div className="flex items-center justify-end gap-4">
            <Link href={`/admin/jobs/${j.id}`} className="label text-olive transition-colors hover:text-moss">
              Edit
            </Link>
            <DeleteButton action={deleteJob.bind(null, j.id)} />
          </div>
        )}
      />
    </div>
  );
}
