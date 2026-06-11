import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal, MaskReveal } from "@/components/anim/Reveal";

/**
 * Shared section/page header: carved eyebrow + Grand Canyon title, left-anchored.
 * `layout="split"` puts the title left and the lead copy on the right.
 * `tone="light"` flips colours for paper-background sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  index,
  lead,
  className,
  titleClassName,
  align = "left",
  layout = "stacked",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  index?: string;
  lead?: ReactNode;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
  layout?: "stacked" | "split";
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const lines = title.split("\n");

  const titleColor = light ? "text-canvas-deep" : "text-paper";
  const eyebrowColor = light ? "text-canvas-deep/70" : "text-sage";
  const leadColor = light ? "text-canvas-deep/75" : "text-sage";
  const ruleBg = light ? "bg-canvas-deep/50" : "bg-sage/60";
  const borderColor = light ? "border-canvas-deep/15" : "border-sage/20";

  const eyebrowEl = (eyebrow || index) && (
    <Reveal className={cn("flex items-center gap-4", eyebrowColor)}>
      {index && <span className="label text-olive">{index}</span>}
      {eyebrow && (
        <span className="label">
          <span
            className={cn(
              "mr-3 inline-block h-px w-8 -translate-y-0.75 align-middle",
              ruleBg,
            )}
          />
          {eyebrow}
        </span>
      )}
    </Reveal>
  );

  const titleEl = (
    <MaskReveal
      lines={lines}
      className={cn(
        "font-display",
        titleColor,
        align === "center" && "mx-auto",
        titleClassName ?? "text-(length:--text-title)",
      )}
    />
  );

  if (layout === "split") {
    return (
      <header
        className={cn(
          "grid items-end gap-x-12 gap-y-6 border-b pb-8 md:grid-cols-[1.2fr_1fr]",
          borderColor,
          className,
        )}
      >
        <div className="flex flex-col gap-4">
          {eyebrowEl}
          {titleEl}
        </div>
        {lead && (
          <Reveal
            delay={0.15}
            className={cn("max-w-[52ch] text-xl leading-relaxed md:pb-2", leadColor)}
          >
            {lead}
          </Reveal>
        )}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrowEl}
      {titleEl}
      {lead && (
        <Reveal
          delay={0.15}
          className={cn(
            "max-w-[60ch] text-2xl leading-relaxed",
            leadColor,
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </Reveal>
      )}
    </header>
  );
}
