"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers, newsletterCampaigns } from "@/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { getActiveSubscribers } from "@/lib/data/newsletter";
import { sendMail, mailConfigured, getSiteUrl } from "@/lib/mailer";
import {
  renderEmailHtml,
  markdownToEmailHtml,
  markdownToPlainText,
} from "@/lib/newsletter/email";

const campaignSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required"),
  // Markdown — rendered to HTML for the email body.
  body: z.string().trim().min(1, "Body is required"),
  ctaLabel: z.string().trim().optional(),
  ctaUrl: z.string().trim().url("Enter a valid button URL").optional().or(z.literal("")),
});

export async function deleteSubscriber(id: string) {
  await requirePermission("newsletter");

  await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.id, id));

  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function deleteCampaign(id: string) {
  await requirePermission("newsletter");

  await db.delete(newsletterCampaigns).where(eq(newsletterCampaigns.id, id));

  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}

export async function sendCampaign(formData: FormData) {
  await requirePermission("newsletter");

  const { subject, body, ctaLabel, ctaUrl } = campaignSchema.parse({
    subject: formData.get("subject"),
    body: formData.get("body"),
    ctaLabel: formData.get("ctaLabel") ?? undefined,
    ctaUrl: formData.get("ctaUrl") ?? undefined,
  });

  if (!mailConfigured) {
    throw new Error(
      "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.",
    );
  }

  const subscribers = await getActiveSubscribers();
  const bodyHtml = markdownToEmailHtml(body);
  const bodyText = markdownToPlainText(body);
  const cta =
    ctaLabel && ctaUrl ? { label: ctaLabel, href: ctaUrl } : undefined;

  // Gmail SMTP has no batch endpoint, so send one at a time. A single bad
  // address shouldn't abort the whole run — log it and keep going, then record
  // how many actually went out.
  let sent = 0;
  for (const subscriber of subscribers) {
    const unsubscribeUrl = `${getSiteUrl()}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
    try {
      await sendMail({
        to: subscriber.email,
        subject,
        unsubscribeUrl,
        text: cta ? `${bodyText}\n\n${cta.label}: ${cta.href}` : bodyText,
        html: renderEmailHtml({ bodyHtml, unsubscribeUrl, cta }),
      });
      sent++;
    } catch (err) {
      console.error(`Newsletter send failed for ${subscriber.email}`, err);
    }
  }

  await db.insert(newsletterCampaigns).values({
    subject,
    body,
    recipientCount: sent,
    sentAt: new Date(),
  });

  revalidatePath("/admin/newsletter");
  redirect("/admin/newsletter");
}
