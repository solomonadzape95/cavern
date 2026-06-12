import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { team, type Member } from "@/db/schema";

export type { Member };

export function getTeam(): Promise<Member[]> {
  return db.select().from(team).orderBy(asc(team.sortOrder));
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  const [member] = await db.select().from(team).where(eq(team.id, id)).limit(1);
  return member;
}
