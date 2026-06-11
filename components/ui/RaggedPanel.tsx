import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Surface = "deep" | "canvas" | "olive" | "sage";

const surfaces: Record<Surface, string> = {
  deep: "bg-canvas-deep",
  canvas: "bg-canvas",
  olive: "bg-olive/90",
  sage: "bg-sage",
};

/**
 * A torn-edged surface. The filtered layer gives the ripped silhouette
 * (from border-template.png, recolored); content sits crisp above it.
 */
export function RaggedPanel({
  children,
  className,
  bodyClassName,
  surface = "deep",
  filter = "torn-soft",
}: {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  surface?: Surface;
  filter?: "torn-soft" | "torn-rough" | "torn-banner";
}) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className={cn("absolute inset-0", surfaces[surface])}
        style={{ filter: `url(#${filter})` }}
      />
      <div className={cn("relative z-10 p-6 md:p-10", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
