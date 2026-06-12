import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { jobs, type Job } from "@/db/schema";

export type { Job };

export function getJobs(): Promise<Job[]> {
  return db.select().from(jobs).orderBy(asc(jobs.sortOrder), asc(jobs.title));
}

export async function getJob(slug: string): Promise<Job | undefined> {
  const [job] = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  return job;
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return job;
}
