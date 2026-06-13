// Scales --text-mega-lg's clamp() down for long hero titles so they fit the
// viewport instead of overflowing (e.g. "Social Media Manager" on /jobs/[slug]).
export function heroTitleSize(title: string): string {
  const longest = Math.max(...title.split("\n").map((line) => line.length));

  const REFERENCE_LENGTH = 6; // ~ "Press", "Games" — full --text-mega-lg size
  const SHRINK_PER_CHAR = 0.035;
  const MIN_SCALE = 0.4;

  const scale = Math.max(
    MIN_SCALE,
    1 - Math.max(0, longest - REFERENCE_LENGTH) * SHRINK_PER_CHAR,
  );

  const min = Math.max(1.75, 3.5 * scale);
  const preferred = 15 * scale;
  const max = Math.max(3.5, 15.5 * scale);

  return `clamp(${min.toFixed(3)}rem, ${preferred.toFixed(3)}vw, ${max.toFixed(3)}rem)`;
}
