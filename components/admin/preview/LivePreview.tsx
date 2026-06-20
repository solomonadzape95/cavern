"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TornFilters } from "@/components/ui/TornFilters";

/** Typed accessors over a snapshot of the watched form's `FormData`. */
export type FormReader = {
  /** A single text value, or "" when absent. */
  text: (name: string) => string;
  /** All non-empty values for a repeated field (description, platforms…). */
  list: (name: string) => string[];
  /** A picked file with content, or null. */
  file: (name: string) => File | null;
};

/**
 * Wraps an admin form and renders a sticky, live-updating preview beside it.
 *
 * The form is left completely untouched — we listen for `input`/`change`
 * events bubbling out of it, re-snapshot its `FormData`, and hand a typed
 * reader to `render`. `TornFilters` is mounted locally because the SVG filter
 * defs that give reused primitives their torn edges only exist on the public
 * site layout, not in the admin shell.
 */
export function LivePreview({
  children,
  render,
  title = "Live preview",
  note,
}: {
  children: ReactNode;
  render: (read: FormReader) => ReactNode;
  title?: string;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<FormData | null>(null);

  function snapshot() {
    const form = ref.current?.querySelector("form");
    if (form) setData(new FormData(form));
  }

  // Seed from the form's default values once it's mounted.
  useEffect(() => {
    snapshot();
  }, []);

  const read: FormReader = {
    text: (name) => {
      const v = data?.get(name);
      return typeof v === "string" ? v : "";
    },
    list: (name) =>
      (data?.getAll(name) ?? []).filter(
        (v): v is string => typeof v === "string" && v.trim() !== "",
      ),
    file: (name) => {
      const v = data?.get(name);
      return v instanceof File && v.size > 0 ? v : null;
    },
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-start">
      <div ref={ref} onInput={snapshot} onChange={snapshot}>
        {children}
      </div>

      <aside className="lg:sticky lg:top-6">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="label text-canvas/60">{title}</span>
          {note && <span className="text-sm text-canvas/40">{note}</span>}
        </div>
        <div className="relative max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden border border-canvas/15 bg-canvas-deep">
          <TornFilters />
          {render(read)}
        </div>
      </aside>
    </div>
  );
}

/** A faux browser chrome bar so previews read as "this is your live page". */
export function PreviewChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-canvas/15 bg-canvas-deep px-3 py-2">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-canvas/25" />
        <span className="size-2.5 rounded-full bg-canvas/25" />
        <span className="size-2.5 rounded-full bg-canvas/25" />
      </span>
      <span className="ml-1 truncate rounded-sm bg-canvas/10 px-2 py-0.5 text-xs text-sage/80">
        {url}
      </span>
    </div>
  );
}
