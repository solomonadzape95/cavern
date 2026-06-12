"use client";

import { useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import { cn } from "@/lib/cn";

type Row = Record<string, string>;
type Item = { id: string; value: Row };

const controlClass =
  "w-full border border-sage/30 bg-canvas-deep px-3 py-2 text-paper placeholder:text-sage/50 focus:border-moss focus:outline-none";

// Tailwind needs static class names — map column count to a literal.
const gridCols: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export function RepeatableGroupList({
  name,
  label,
  fields,
  initial = [],
}: {
  name: string;
  label: string;
  fields: { key: string; label: string; placeholder?: string }[];
  initial?: Row[];
}) {
  const empty = (): Row => Object.fromEntries(fields.map((f) => [f.key, ""]));
  const [items, setItems] = useState<Item[]>(() =>
    (initial.length ? initial : [empty()]).map((value) => ({
      id: crypto.randomUUID(),
      value,
    })),
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="label text-canvas/60">{label}</span>
        <button
          type="button"
          onClick={() => setItems((it) => [...it, { id: crypto.randomUUID(), value: empty() }])}
          className="label flex items-center gap-1 text-olive transition-colors hover:text-moss"
        >
          <LuPlus aria-hidden /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={item.id} className="flex gap-2">
            <div className={cn("grid flex-1 gap-2", gridCols[fields.length] ?? "sm:grid-cols-2")}>
              {fields.map((f) => (
                <input
                  key={f.key}
                  name={`${name}.${i}.${f.key}`}
                  defaultValue={item.value[f.key] ?? ""}
                  placeholder={f.placeholder ?? f.label}
                  className={controlClass}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setItems((it) => it.filter((x) => x.id !== item.id))}
              aria-label="Remove"
              className="shrink-0 self-start border border-canvas/20 p-2 text-canvas/60 transition-colors hover:border-moss hover:text-moss"
            >
              <LuX aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
