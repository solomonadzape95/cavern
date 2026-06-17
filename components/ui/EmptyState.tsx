import type { ReactNode } from "react";
import { Reveal } from "@/components/anim/Reveal";

/**
 * On-brand placeholder for list pages with no rows yet (no games, news,
 * or jobs). Keeps the page from collapsing — or crashing — when the DB
 * is empty.
 */
export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col items-center justify-center border border-dashed border-sage/25 px-6 py-24 text-center md:py-32">
      <h2 className="font-heading text-2xl text-paper md:text-3xl">{title}</h2>
      {children && <p className="mt-3 max-w-[42ch] text-sage">{children}</p>}
    </Reveal>
  );
}
