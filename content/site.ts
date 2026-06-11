export const SITE = {
  name: "Cavern Studios",
  short: "Cavern",
  tagline: "Small team. Big worlds.",
  blurb:
    "A small independent studio making strange, beautiful games — one frame at a time.",
  email: "hello@cavern.studio",
  pressEmail: "press@cavern.studio",
  location: "Enugu, Nigeria.",
  founded: 2024,
} as const;

export type NavLink = { label: string; href: string; note?: string };

export const NAV: NavLink[] = [
  { label: "Games", href: "/games", note: "Our games" },
  { label: "Studio", href: "/about", note: "Meet the team" },
  { label: "Jobs", href: "/jobs", note: "Open roles" },
  { label: "News", href: "/news", note: "Latest updates" },
  { label: "Press", href: "/press", note: "Kit & assets" },
  { label: "Contact", href: "/contact", note: "Say hello" },
];

export type Social = { label: string; href: string; handle: string };

export const SOCIALS: Social[] = [
  { label: "Bluesky", href: "https://bsky.app", handle: "@cavern.studio" },
  { label: "Discord", href: "https://discord.com", handle: "/cavern" },
  { label: "YouTube", href: "https://youtube.com", handle: "/cavernstudios" },
  { label: "Steam", href: "https://store.steampowered.com", handle: "Cavern" },
];
