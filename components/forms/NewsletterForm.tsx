"use client";

import { useActionState } from "react";
import { GrungeButton } from "@/components/ui/GrungeButton";
import { cn } from "@/lib/cn";
import { subscribeToNewsletter } from "@/lib/newsletter/actions";
import { initialNewsletterState } from "@/lib/newsletter/types";

export function NewsletterForm({
  className,
  tone = "solid",
}: {
  className?: string;
  tone?: "solid" | "sage";
}) {
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterState,
  );

  if (state.status === "success") {
    return (
      <p role="status" className={cn("text-paper", className)}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <div className="flex-1">
        <input
          type="email"
          name="email"
          required
          placeholder="you@studio.com"
          aria-label="Email address"
          className="w-full border-b border-sage/40 bg-transparent py-3 text-paper placeholder:text-sage/50 transition-colors focus:border-moss focus:outline-none"
        />
        {state.status === "error" && (
          <p role="alert" className="mt-2 text-sm text-red-400">
            {state.message}
          </p>
        )}
      </div>
      <GrungeButton type="submit" size="sm" tone={tone} disabled={pending} className="shrink-0">
        {pending ? "Subscribing…" : "Subscribe"}
      </GrungeButton>
    </form>
  );
}
