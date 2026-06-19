"use server";

import { z } from "zod";
import { escapeHtml } from "@/lib/forms";
import { getSiteSettings } from "@/lib/data/site";
import { sendMail, mailConfigured } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(200),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please write a message").max(5000),
});

export type ContactState = {
  ok: boolean;
  error?: string;
};

/**
 * Emails the studio inbox (Site settings → email) with the visitor's message.
 * Reply-To is set to the visitor so a reply goes straight back to them.
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  if (!mailConfigured) {
    return {
      ok: false,
      error: "Messaging isn't set up yet. Please email us directly for now.",
    };
  }

  const { name, email, subject, message } = parsed.data;
  const settings = await getSiteSettings();
  const label = subject || "General";

  const text = `New contact message — ${label}\n\nFrom: ${name} <${email}>\n\n${message}`;
  const html = `<div style="font-family:Georgia,serif;color:#2f382d;line-height:1.6;">
    <p style="margin:0 0 4px;"><strong>New contact message</strong> — ${escapeHtml(label)}</p>
    <p style="margin:0 0 16px;">From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <div style="white-space:pre-wrap;border-left:3px solid #41723b;padding-left:12px;">${escapeHtml(message)}</div>
  </div>`;

  try {
    await sendMail({
      to: settings.email,
      subject: `[Contact] ${label} — ${name}`,
      text,
      html,
      replyTo: `${name} <${email}>`,
    });
    return { ok: true };
  } catch (err) {
    console.error("Contact message failed to send", err);
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again or email us directly.",
    };
  }
}
