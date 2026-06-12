import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { services, type Service } from "@/db/schema";

export type { Service };

export function getServices(): Promise<Service[]> {
  return db.select().from(services).orderBy(asc(services.sortOrder), asc(services.no));
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  return service;
}
