import { cn } from "@/lib/cn";

type TornFilter = "torn-rough" | "torn-soft" | "torn-banner";

/**
 * Torn-paper transition strip for the bottom of a section, using the same
 * feTurbulence/feDisplacementMap technique as GrungeFrame/GrungeButton.
 *
 * Fill it with the *next* section's background color: the strip sits at
 * this section's bottom edge with a jagged top boundary, so the next
 * section's color appears to tear up into this one. Any downward bleed
 * from the displacement lands on the next section, which is the same
 * color, so it's invisible.
 */
export function GrungeEdge({
  color,
  height = 64,
  filter = "torn-banner",
  top = false,
  className,
}: {
  /** background color of the section that follows */
  color: string;
  height?: number;
  filter?: TornFilter;
  top?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "w-full pointer-events-none absolute inset-x-0 z-10",
        top ? "top-0" : "bottom-0",
        className,
      )}
      style={{ height, backgroundColor: color, filter: `url(#${filter})` }}
    />
  );
}
