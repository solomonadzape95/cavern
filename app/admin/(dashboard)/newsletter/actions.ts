"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers, newsletterCampaigns } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getActiveSubscribers } from "@/lib/data/newsletter";
import { resend, NEWSLETTER_FROM, getSiteUrl } from "@/lib/resend";
import { renderEmailHtml, textToHtmlParagraphs } from "@/lib/newsletter/email";

const campaignSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required"),
  body: z.string().trim().min(1, "Body is required"),
});

export async function deleteSubscriber(id: string) {
  await requirePermission("newsletter");

  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));

  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function sendCampaign(formData: FormData) {
  await requirePermission("newsletter");

  const { subject, body } = campaignSchema.parse({
    subject: formData.get("subject"),
    body: formData.get("body"),
  });

  const subscribers = await getActiveSubscribers();
  const bodyHtml = textToHtmlParagraphs(body);

  for (let i = 0; i < subscribers.length; i += 100) {
    const chunk = subscribers.slice(i, i + 100);
    const { error } = await resend.batch.send(
      chunk.map((subscriber) => ({
        from: NEWSLETTER_FROM,
        to: subscriber.email,
        subject,
        html: renderEmailHtml({
          bodyHtml,
          unsubscribeUrl: `${getSiteUrl()}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`,
        }),
      })),
    );
    if (error) throw new Error(error.message);
  }

  await db.insert(newsletterCampaigns).values({
    subject,
    body,
    recipientCount: subscribers.length,
    sentAt: new Date(),
  });

  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}
