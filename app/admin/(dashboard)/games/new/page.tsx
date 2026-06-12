import { requirePermission } from "@/lib/auth/dal";
import { GameForm } from "../GameForm";
import { createGame } from "../actions";

export default async function NewGamePage() {
  await requirePermission("games");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">New game</h1>
        <p className="mt-1 text-canvas/60">Add a game to your site.</p>
      </div>
      <GameForm action={createGame} />
    </div>
  );
}
