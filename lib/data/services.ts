import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { services, type Service } from "@/db/schema";

export type { Service };

export const getServices = unstable_cache(
  (): Promise<Service[]> =>
    db.select().from(services).orderBy(asc(services.sortOrder), asc(services.no)),
  ["services"],
  { tags: ["services"], revalidate: 3600 },
);

export async function getServiceById(id: string): Promise<Service | undefined> {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  return service;
}
