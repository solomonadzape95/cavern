/** Reads every value submitted under `name` (from a RepeatableTextList), trims, and drops blanks. */
export function getStringList(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .map((v) => String(v).trim())
    .filter(Boolean);
}

/**
 * Reads a RepeatableGroupList submitted as `${name}.${index}.${field}` inputs,
 * groups by index, and drops rows where every field is blank.
 */
export function getGroupList<T extends Record<string, string>>(
  formData: FormData,
  name: string,
  keys: readonly (keyof T & string)[],
): T[] {
  const rows = new Map<number, Record<string, string>>();
  const pattern = new RegExp(`^${name}\\.(\\d+)\\.(.+)$`);

  for (const [key, value] of formData.entries()) {
    const match = key.match(pattern);
    if (!match) continue;
    const field = match[2];
    if (!keys.includes(field as keyof T & string)) continue;
    const index = Number(match[1]);
    const row = rows.get(index) ?? {};
    row[field] = String(value).trim();
    rows.set(index, row);
  }

  return [...rows.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, row]) => row as T)
    .filter((row) => Object.values(row).some((v) => v));
}

/** A trimmed string field, or undefined if blank — for nullable text columns. */
export function getOptionalString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}
