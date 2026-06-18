"use server";

import { z } from "zod";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { sendMail, mailConfigured, getSiteUrl } from "@/lib/mailer";
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

  if (mailConfigured) {
    const unsubscribeUrl = `${getSiteUrl()}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
    try {
      await sendMail({
        to: email,
        subject: "Welcome to the Cavern newsletter",
        unsubscribeUrl,
        text:
          "You're in.\n\nThanks for subscribing — expect devlogs, releases, " +
          "and the occasional studio confession in your inbox.",
        html: renderEmailHtml({
          preheader: "Thanks for subscribing to Cavern's newsletter.",
          bodyHtml:
            "<h1>You're in.</h1>" +
            '<p>Thanks for subscribing — expect devlogs, releases, and the occasional studio confession in your inbox.</p>',
          unsubscribeUrl,
        }),
      });
    } catch (err) {
      // Subscription still succeeds even if the welcome email fails to send,
      // but log it so misconfigured SMTP creds aren't silently swallowed.
      console.error(`Welcome email failed for ${email}`, err);
    }
  }

  return { status: "success", message: "You're in — check your inbox for a welcome note." };
}
