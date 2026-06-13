import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  newsletterSubscribers,
  newsletterCampaigns,
  type NewsletterSubscriber,
  type NewsletterCampaign,
} from "@/db/schema";

export type { NewsletterSubscriber, NewsletterCampaign };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function getSubscribers(): Promise<NewsletterSubscriber[]> {
  return db
    .select()
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.subscribedAt));
}

export function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  return db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.status, "subscribed"));
}

export function getCampaigns(): Promise<NewsletterCampaign[]> {
  return db
    .select()
    .from(newsletterCampaigns)
    .orderBy(desc(newsletterCampaigns.createdAt));
}

/** Marks a subscriber unsubscribed by their unsubscribe token. Returns false for an invalid/unknown token. */
export async function unsubscribeByToken(token: string): Promise<boolean> {
  if (!UUID_RE.test(token)) return false;

  const result = await db
    .update(newsletterSubscribers)
    .set({ status: "unsubscribed" })
    .where(eq(newsletterSubscribers.unsubscribeToken, token))
    .returning({ id: newsletterSubscribers.id });

  return result.length > 0;
}
