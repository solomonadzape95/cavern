"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";

function Inner({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "label text-canvas/60 transition-colors hover:text-red-600 disabled:opacity-60",
      )}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}

/** A delete form that confirms before submitting. Wrap a Server Function bound to the row id. */
export function DeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Delete this item? This can't be undone.",
}: {
  action: () => void;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <Inner label={label} />
    </form>
  );
}
