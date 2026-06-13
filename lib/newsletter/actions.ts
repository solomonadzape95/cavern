"use server";

import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { resend, NEWSLETTER_FROM, getSiteUrl } from "@/lib/resend";
import { renderEmailHtml } from "./email";
import type { NewsletterFormState } from "./types";

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address");

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email address",
    };
  }
  const email = parsed.data;

  const [subscriber] = await db
    .insert(newsletterSubscribers)
    .values({ email })
    .onConflictDoUpdate({
      target: newsletterSubscribers.email,
      set: { status: "subscribed" },
    })
    .returning();

  if (process.env.RESEND_API_KEY) {
    const unsubscribeUrl = `${getSiteUrl()}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
    try {
      await resend.emails.send({
        from: NEWSLETTER_FROM,
        to: email,
        subject: "Welcome to the Cavern newsletter",
        html: renderEmailHtml({
          preheader: "Thanks for subscribing to Cavern's newsletter.",
          bodyHtml:
            '<h1 style="font-size:24px;margin:0 0 16px;">You\'re in.</h1>' +
            '<p style="margin:0 0 1em;">Thanks for subscribing — expect devlogs, releases, and the occasional studio confession in your inbox.</p>',
          unsubscribeUrl,
        }),
      });
    } catch {
      // Subscription still succeeds even if the welcome email fails to send.
    }
  }

  return { status: "success", message: "You're in — check your inbox for a welcome note." };
}
