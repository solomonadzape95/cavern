"use client";

import { useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import { cn } from "@/lib/cn";

type Item = { id: string; value: string };

const controlClass =
  "w-full border border-sage/30 bg-canvas-deep px-3 py-2 text-paper placeholder:text-sage/50 focus:border-moss focus:outline-none";

export function RepeatableTextList({
  name,
  label,
  initial = [],
  placeholder,
  multiline,
}: {
  name: string;
  label: string;
  initial?: string[];
  placeholder?: string;
  multiline?: boolean;
}) {
  const [items, setItems] = useState<Item[]>(() =>
    (initial.length ? initial : [""]).map((value) => ({
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
          onClick={() => setItems((it) => [...it, { id: crypto.randomUUID(), value: "" }])}
          className="label flex items-center gap-1 text-olive transition-colors hover:text-moss"
        >
          <LuPlus aria-hidden /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-2">
            {multiline ? (
              <textarea
                name={name}
                defaultValue={item.value}
                placeholder={placeholder}
                className={cn(controlClass, "min-h-20 resize-y")}
              />
            ) : (
              <input
                name={name}
                defaultValue={item.value}
                placeholder={placeholder}
                className={controlClass}
              />
            )}
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
