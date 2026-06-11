import { cn } from "@/lib/cn";

/** Orbiting-dot spinner. Size via `--loader-size` (set through `className`, e.g. `[--loader-size:4rem]`). */
export function Loader({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className={cn("flex flex-col items-center gap-4", className)}
    >
      <span aria-hidden className="loader" />
      {label && <p className="label text-sage">{label}</p>}
    </div>
  );
}
