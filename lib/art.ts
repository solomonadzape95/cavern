import type { GameAccent } from "@/db/schema";

const ACCENT_HEX: Record<GameAccent, string> = {
  moss: "41723b",
  olive: "807f51",
  sage: "a2af9e",
  deep: "2f382d",
};

// DiceBear "shapes" — placeholder key art until real cover images land.
export function coverArt(game: { slug: string; accent: GameAccent }): string {
  const params = new URLSearchParams({
    seed: game.slug,
    backgroundColor: ACCENT_HEX[game.accent],
  });
  return `https://api.dicebear.com/9.x/shapes/svg?${params.toString()}`;
}

// DiceBear "notionists" — hand-drawn, ink-like; matches the woodcut tone.
export function avatar(seed: string): string {
  const params = new URLSearchParams({
    seed,
    backgroundColor: "3f4a3c",
    backgroundType: "solid",
    radius: "0",
  });
  return `https://api.dicebear.com/9.x/notionists/svg?${params.toString()}`;
}
