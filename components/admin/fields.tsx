import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/cn";

const controlClass =
  "w-full border border-sage/30 bg-canvas-deep px-3 py-2 text-paper placeholder:text-sage/50 focus:border-moss focus:outline-none";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="label text-canvas/60 block">
        {label}
      </label>
      {children}
      {hint && <p className="text-sm text-canvas/50">{hint}</p>}
    </div>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input {...props} className={cn(controlClass, props.className)} />;
}

export function TextArea(props: ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(controlClass, "min-h-24 resize-y", props.className)}
    />
  );
}

export function Select(props: ComponentProps<"select">) {
  return (
    <select {...props} className={cn(controlClass, props.className)} />
  );
}
