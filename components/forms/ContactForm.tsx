"use client";

import { useActionState } from "react";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { cn } from "@/lib/cn";
import { sendContactMessage, type ContactState } from "@/app/(site)/contact/actions";

const field =
  "w-full bg-transparent border-b border-sage/40 py-3 text-paper placeholder:text-sage/50 focus:border-moss focus:outline-none transition-colors";

const initialState: ContactState = { ok: false };

export function ContactForm({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="border border-moss/40 bg-canvas-deep/60 p-8">
        <p className="font-heading text-3xl text-paper">Message sent.</p>
        <p className="mt-2 text-sage">
          We read everything. Expect a reply within a few days — sooner if it
          involves something we&apos;d love to make.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div
        className={cn(
          "grid gap-5",
          variant === "full" && "sm:grid-cols-2",
        )}
      >
        <label className="block">
          <span className="label text-sage">Name</span>
          <input required name="name" className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="label text-sage">Email</span>
          <input
            required
            type="email"
            name="email"
            className={field}
            placeholder="you@studio.com"
          />
        </label>
      </div>

      {variant === "full" && (
        <label className="block">
          <span className="label text-sage">Subject</span>
          <select name="subject" className={cn(field, "appearance-none")}>
            <option className="bg-canvas-deep">General</option>
            <option className="bg-canvas-deep">Sponsorship / partnership</option>
            <option className="bg-canvas-deep">Press</option>
            <option className="bg-canvas-deep">Co-development</option>
          </select>
        </label>
      )}

      <label className="block">
        <span className="label text-sage">Message</span>
        <textarea
          required
          name="message"
          rows={variant === "compact" ? 3 : 5}
          className={cn(field, "resize-none")}
          placeholder="Tell us what you're dreaming up."
        />
      </label>

      {state.error && (
        <p className="text-sm text-red-300" role="alert">
          {state.error}
        </p>
      )}

      <div className="mt-1">
        <GrungeButton type="submit" size="md" disabled={pending}>
          {pending ? "Sending…" : "Send it"}
        </GrungeButton>
      </div>
    </form>
  );
}
