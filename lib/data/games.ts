import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { games, type Game } from "@/db/schema";

export type { Game };

export function getGames(): Promise<Game[]> {
  return db.select().from(games).orderBy(asc(games.sortOrder), asc(games.year));
}

export async function getGame(slug: string): Promise<Game | undefined> {
  const [game] = await db.select().from(games).where(eq(games.slug, slug)).limit(1);
  return game;
}

export async function getGameById(id: string): Promise<Game | undefined> {
  const [game] = await db.select().from(games).where(eq(games.id, id)).limit(1);
  return game;
}
