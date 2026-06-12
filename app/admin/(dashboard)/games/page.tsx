import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getGames } from "@/lib/data/games";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteGame } from "./actions";

export default async function AdminGamesPage() {
  await requirePermission("games");
  const items = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">Games</h1>
          <p className="mt-1 text-canvas/60">The games shown on your site.</p>
        </div>
        <Link href="/admin/games/new" className="label bg-moss px-4 py-2 text-paper">
          New game
        </Link>
      </div>

      <DataTable
        items={items}
        columns={[
          { header: "Title", cell: (g) => g.title },
          { header: "Status", cell: (g) => g.status },
          { header: "Year", cell: (g) => g.year },
        ]}
        rowActions={(g) => (
          <div className="flex items-center justify-end gap-4">
            <Link href={`/admin/games/${g.id}`} className="label text-olive transition-colors hover:text-moss">
              Edit
            </Link>
            <DeleteButton action={deleteGame.bind(null, g.id)} />
          </div>
        )}
      />
    </div>
  );
}
