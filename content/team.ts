export type Member = {
  name: string;
  role: string;
  /** dicebear seed */
  seed: string;
  bio: string;
  links: { label: string; href: string }[];
  /** bento sizing */
  span?: "lg" | "tall" | "wide";
};

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

export const TEAM: Member[] = [
  {
    name: "Ama Boateng",
    role: "Studio Director",
    seed: "Ama-Boateng",
    bio: "Keeps the studio on track and the scope honest.",
    span: "lg",
    links: [
      { label: "Bluesky", href: "https://bsky.app" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
  {
    name: "Tomas Reyes",
    role: "Creative Director",
    seed: "Tomas-Reyes",
    bio: "Designs the worlds, then makes you want to live in them.",
    span: "tall",
    links: [
      { label: "ArtStation", href: "https://artstation.com" },
      { label: "Bluesky", href: "https://bsky.app" },
    ],
  },
  {
    name: "Nadia Okonkwo",
    role: "Lead Engineer",
    seed: "Nadia-Okonkwo",
    bio: "Keeps everything running smoothly at 60fps.",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Bluesky", href: "https://bsky.app" },
    ],
  },
  {
    name: "Bjorn Haugen",
    role: "Audio Director",
    seed: "Bjorn-Haugen",
    bio: "Records cellos in stairwells. Worth it.",
    span: "wide",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com" },
      { label: "Bandcamp", href: "https://bandcamp.com" },
    ],
  },
  {
    name: "Priya Nair",
    role: "Lead Animator",
    seed: "Priya-Nair",
    bio: "Four thousand frames and counting.",
    links: [
      { label: "ArtStation", href: "https://artstation.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    name: "Marco Silva",
    role: "Producer",
    seed: "Marco-Silva",
    bio: "Translates 'soon' into actual dates.",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Bluesky", href: "https://bsky.app" },
    ],
  },
];
