import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getNews } from "@/lib/data/news";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePost } from "./actions";

export default async function AdminNewsPage() {
  await requirePermission("news");
  const items = await getNews();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">News</h1>
          <p className="mt-1 text-canvas/60">Devlogs, releases, and studio updates shown on your News page.</p>
        </div>
        <Link href="/admin/news/new" className="label bg-moss px-4 py-2 text-paper">
          New post
        </Link>
      </div>

      <DataTable
        items={items}
        columns={[
          { header: "Title", cell: (p) => p.title },
          { header: "Type", cell: (p) => p.kind },
          { header: "Date", cell: (p) => p.date },
        ]}
        rowActions={(p) => (
          <div className="flex items-center justify-end gap-4">
            <Link href={`/admin/news/${p.id}`} className="label text-olive transition-colors hover:text-moss">
              Edit
            </Link>
            <DeleteButton action={deletePost.bind(null, p.id)} />
          </div>
        )}
      />
    </div>
  );
}
