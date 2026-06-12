import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { news, type Post } from "@/db/schema";

export type { Post };

export function getNews(): Promise<Post[]> {
  return db.select().from(news).orderBy(desc(news.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const [post] = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return post;
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const [post] = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return post;
}
