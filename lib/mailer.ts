import "server-only";

import nodemailer from "nodemailer";

// Gmail SMTP by default — override SMTP_HOST/SMTP_PORT for another provider.
const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.GMAIL_USER;
// A Google "App Password" (Account → Security → App passwords), not the
// normal account password. Requires 2-Step Verification to be enabled.
const pass = process.env.GMAIL_APP_PASSWORD;

/** True once a sender address and app password are configured. */
export const mailConfigured = Boolean(user && pass);

// Gmail rewrites the From header to the authenticated account (or a verified
// "Send mail as" alias), so this defaults to the signed-in Gmail address.
export const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM_EMAIL ?? (user ? `Cavern Studios <${user}>` : "");

let transporter: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (!mailConfigured) {
    throw new Error(
      "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.",
    );
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user, pass },
    });
  }
  return transporter;
}

/** Sends a single email. Throws if mail isn't configured or the send fails. */
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  /** Plain-text alternative — improves deliverability and serves HTML-blocking clients. */
  text?: string;
  /** Adds a List-Unsubscribe header so inboxes show a native unsubscribe control. */
  unsubscribeUrl?: string;
}): Promise<void> {
  await getTransport().sendMail({
    from: NEWSLETTER_FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.text ? { text: opts.text } : {}),
    ...(opts.unsubscribeUrl
      ? { list: { unsubscribe: { url: opts.unsubscribeUrl, comment: "Unsubscribe" } } }
      : {}),
  });
}

/** Absolute origin used to build links inside outbound emails. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}
