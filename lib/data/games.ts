import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { games, type Game } from "@/db/schema";

export type { Game };

export const getGames = unstable_cache(
  (): Promise<Game[]> => db.select().from(games).orderBy(asc(games.sortOrder), asc(games.year)),
  ["games"],
  { tags: ["games"], revalidate: 3600 },
);

export const getGame = unstable_cache(
  async (slug: string): Promise<Game | undefined> => {
    const [game] = await db.select().from(games).where(eq(games.slug, slug)).limit(1);
    return game;
  },
  ["game"],
  { tags: ["games"], revalidate: 3600 },
);

export async function getGameById(id: string): Promise<Game | undefined> {
  const [game] = await db.select().from(games).where(eq(games.id, id)).limit(1);
  return game;
}
