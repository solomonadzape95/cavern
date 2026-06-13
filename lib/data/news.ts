import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { news, type Post } from "@/db/schema";

export type { Post };

export const getNews = unstable_cache(
  (): Promise<Post[]> => db.select().from(news).orderBy(desc(news.date)),
  ["news"],
  { tags: ["news"], revalidate: 3600 },
);

export const getPost = unstable_cache(
  async (slug: string): Promise<Post | undefined> => {
    const [post] = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
    return post;
  },
  ["news-post"],
  { tags: ["news"], revalidate: 3600 },
);

export async function getPostById(id: string): Promise<Post | undefined> {
  const [post] = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return post;
}
