"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

// MDEditor touches `window`/`navigator`, so load it client-only.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

/**
 * A full markdown editor (toolbar + live preview) whose value is mirrored into
 * a hidden textarea so it submits with the surrounding form under `name`.
 */
export function MarkdownField({
  name,
  defaultValue = "",
  height = 360,
}: {
  name: string;
  defaultValue?: string;
  height?: number;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(v) => setValue(v ?? "")}
        height={height}
        preview="live"
        textareaProps={{ placeholder: "Write your update in markdown…" }}
      />
      <textarea name={name} value={value} readOnly hidden />
    </div>
  );
}
