import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { team, type Member } from "@/db/schema";

export type { Member };

export const getTeam = unstable_cache(
  (): Promise<Member[]> => db.select().from(team).orderBy(asc(team.sortOrder)),
  ["team"],
  { tags: ["team"], revalidate: 3600 },
);

export async function getMemberById(id: string): Promise<Member | undefined> {
  const [member] = await db.select().from(team).where(eq(team.id, id)).limit(1);
  return member;
}
