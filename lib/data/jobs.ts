import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { jobs, type Job } from "@/db/schema";

export type { Job };

export const getJobs = unstable_cache(
  (): Promise<Job[]> => db.select().from(jobs).orderBy(asc(jobs.sortOrder), asc(jobs.title)),
  ["jobs"],
  { tags: ["jobs"], revalidate: 3600 },
);

export const getJob = unstable_cache(
  async (slug: string): Promise<Job | undefined> => {
    const [job] = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
    return job;
  },
  ["job"],
  { tags: ["jobs"], revalidate: 3600 },
);

export async function getJobById(id: string): Promise<Job | undefined> {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return job;
}
