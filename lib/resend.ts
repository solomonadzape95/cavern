import "server-only";

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM_EMAIL ?? "Cavern <onboarding@resend.dev>";

/** Absolute origin used to build links inside outbound emails. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}
