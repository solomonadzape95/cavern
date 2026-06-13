import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { siteSettings, type SiteSettings } from "@/db/schema";

export type { SiteSettings };

export const SINGLETON_ID = "default";

// Fallback used before the row is seeded, so chrome never crashes.
export const DEFAULT_SITE: Omit<SiteSettings, "createdAt" | "updatedAt"> = {
  id: SINGLETON_ID,
  name: "Cavern Studios",
  short: "Cavern",
  tagline: "Small team. Big worlds.",
  blurb:
    "A small independent studio making strange, beautiful games — one frame at a time.",
  email: "hello@cavern.studio",
  pressEmail: "press@cavern.studio",
  location: "Enugu, Nigeria.",
  founded: 2024,
  nav: [
    { label: "Games", href: "/games", note: "Our games" },
    { label: "Studio", href: "/about", note: "Meet the team" },
    { label: "Jobs", href: "/jobs", note: "Open roles" },
    { label: "News", href: "/news", note: "Latest updates" },
    { label: "Press", href: "/press", note: "Kit & assets" },
    { label: "Contact", href: "/contact", note: "Say hello" },
  ],
  socials: [
    { label: "Bluesky", href: "https://bsky.app", handle: "@cavern.studio" },
    { label: "Discord", href: "https://discord.com", handle: "/cavern" },
    { label: "YouTube", href: "https://youtube.com", handle: "/cavernstudios" },
    { label: "Steam", href: "https://store.steampowered.com", handle: "Cavern" },
  ],
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const [row] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, SINGLETON_ID))
      .limit(1);
    if (row) return row;
    return {
      ...DEFAULT_SITE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },
  ["site-settings"],
  { tags: ["site"], revalidate: 3600 },
);
