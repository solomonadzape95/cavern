export type Game = {
  slug: string;
  title: string;
  year: string;
  status: "Released" | "In development" | "Announced";
  genre: string;
  /** spine + cover accent (within palette) */
  accent: "moss" | "olive" | "sage" | "deep";
  tagline: string;
  blurb: string;
  description: string[];
  platforms: string[];
  features: string[];
};

const ACCENT_HEX: Record<Game["accent"], string> = {
  moss: "41723b",
  olive: "807f51",
  sage: "a2af9e",
  deep: "2f382d",
};

// DiceBear "shapes" — placeholder key art until real cover images land.
export function coverArt(game: Game): string {
  const params = new URLSearchParams({
    seed: game.slug,
    backgroundColor: ACCENT_HEX[game.accent],
  });
  return `https://api.dicebear.com/9.x/shapes/svg?${params.toString()}`;
}

export const GAMES: Game[] = [
  {
    slug: "hollow-lantern",
    title: "Hollow Lantern",
    year: "2023",
    status: "Released",
    genre: "Atmospheric platformer",
    accent: "moss",
    tagline: "Carry the last light down.",
    blurb:
      "A hand-inked descent through a collapsing mine, lit only by a lantern that drinks the dark.",
    description: [
      "Hollow Lantern is a side-scrolling descent into a mine that should have stayed sealed. Your lantern is the only thing keeping the dark — and the things in it — at arm's length.",
      "Every screen is hand-inked, every cavern hand-tuned. Light is currency, courage is finite, and the way down is the only way out.",
    ],
    platforms: ["PC", "Switch", "PlayStation"],
    features: [
      "Hand-inked, 4,000+ frames of animation",
      "Light-as-resource traversal",
      "Original cello-driven score",
      "6–8 hour descent",
    ],
  },
  {
    slug: "salt-king",
    title: "Salt King",
    year: "2024",
    status: "Released",
    genre: "Roguelike deckbuilder",
    accent: "olive",
    tagline: "Trade your bones for the crown.",
    blurb:
      "Build a caravan, cross a dead sea of salt, and barter with things that no longer have faces.",
    description: [
      "Salt King is a roguelike deckbuilder set on a cracked white sea. Every card is a member of your caravan; every run, the desert takes some of them back.",
      "Strike bargains with the salt-things, but read the fine print — they always collect.",
    ],
    platforms: ["PC", "Mobile"],
    features: [
      "180+ hand-drawn cards",
      "Branching caravan economy",
      "Permadeath with inheritance",
      "Daily challenge runs",
    ],
  },
  {
    slug: "moss-cathedral",
    title: "Moss Cathedral",
    year: "2025",
    status: "In development",
    genre: "First-person explorer",
    accent: "sage",
    tagline: "The forest learned to pray.",
    blurb:
      "Wander an overgrown basilica where the architecture grows back faster than you can map it.",
    description: [
      "Moss Cathedral is a slow, first-person walk through a ruin the forest is reclaiming in real time. Walls bloom, corridors close, and the map you draw is wrong by the time you finish it.",
      "No combat. No timers. Just you, a notebook, and a building that remembers being alive.",
    ],
    platforms: ["PC", "PlayStation", "Xbox"],
    features: [
      "Growing, semi-procedural architecture",
      "In-game cartography",
      "Diegetic, wordless story",
      "Photo mode",
    ],
  },
  {
    slug: "ferrymans-coin",
    title: "Ferryman's Coin",
    year: "2026",
    status: "Announced",
    genre: "Narrative adventure",
    accent: "deep",
    tagline: "Everyone pays the toll.",
    blurb:
      "A point-and-click about the woman who rows the dead across — and the one passenger who won't disembark.",
    description: [
      "Ferryman's Coin is a hand-painted narrative adventure. You are the ferry, the river, and the keeper of a ledger that must always balance.",
      "Until one night a passenger steps aboard with no coin, no name, and no intention of leaving.",
    ],
    platforms: ["PC", "Switch"],
    features: [
      "Hand-painted backgrounds",
      "Branching, consequence-heavy dialogue",
      "Fully voiced",
      "Wishlist now",
    ],
  },
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
