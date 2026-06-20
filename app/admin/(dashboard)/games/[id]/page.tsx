import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/dal";
import { getGameById } from "@/lib/data/games";
import { GamePreviewPane } from "@/components/admin/preview/GamePreview";
import { GameForm } from "../GameForm";
import { updateGame } from "../actions";

export default async function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("games");
  const { id } = await params;
  const game = await getGameById(id);
  if (!game) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="label text-canvas/60">Editing game</p>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">{game.title}</h1>
      </div>
      <GamePreviewPane existingImage={game.image ?? null}>
        <GameForm game={game} action={updateGame.bind(null, game.id)} />
      </GamePreviewPane>
    </div>
  );
}
