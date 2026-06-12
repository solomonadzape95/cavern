import { config } from "dotenv";

// Next.js stores secrets in .env.local; load it before reading DATABASE_URL.
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { games, news, jobs, team, services, siteSettings } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle({ client: sql, schema, casing: "snake_case" });

const GAMES = [
  {
    slug: "hollow-lantern",
    title: "Hollow Lantern",
    year: "2023",
    status: "Released" as const,
    genre: "Atmospheric platformer",
    accent: "moss" as const,
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
    status: "Released" as const,
    genre: "Roguelike deckbuilder",
    accent: "olive" as const,
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
    status: "In development" as const,
    genre: "First-person explorer",
    accent: "sage" as const,
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
    status: "Announced" as const,
    genre: "Narrative adventure",
    accent: "deep" as const,
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

const NEWS = [
  {
    slug: "moss-cathedral-reveal",
    title: "Moss Cathedral, revealed",
    date: "2026-05-28",
    kind: "Release" as const,
    excerpt:
      "Our growing-architecture explorer steps into the light. Here's the first trailer and what we learned building a building that builds itself.",
  },
  {
    slug: "inking-4000-frames",
    title: "Inking 4,000 frames by hand",
    date: "2026-04-12",
    kind: "Devlog" as const,
    excerpt:
      "Priya breaks down the pipeline behind Hollow Lantern's animation — and why we still ink the dark by hand.",
  },
  {
    slug: "recording-cellos-in-stairwells",
    title: "Recording cellos in stairwells",
    date: "2026-03-03",
    kind: "Devlog" as const,
    excerpt:
      "Bjorn on capturing the score where the reverb is free and the neighbours are patient.",
  },
  {
    slug: "we-are-hiring-2026",
    title: "We're hiring",
    date: "2026-02-09",
    kind: "Studio" as const,
    excerpt:
      "Six new roles. We're growing the team across engineering, art, audio, and marketing.",
  },
];

const JOBS = [
  {
    slug: "game-programmer-unity",
    title: "Game Programmer",
    discipline: "Engineering",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Build the systems that make our games feel alive — gameplay, tools, and the messy magic in between.",
    responsibilities: [
      "Own gameplay systems end-to-end in Unity (C#)",
      "Prototype mechanics fast, then make them ship-quality",
      "Build editor tools that make designers faster",
      "Profile and optimise for console + handheld targets",
    ],
    requirements: [
      "3+ years shipping games in Unity",
      "Strong C# and a feel for game-feel",
      "Comfortable across gameplay, UI, and tooling",
      "Bonus: shaders, ECS/DOTS, or console experience",
    ],
  },
  {
    slug: "2d-artist",
    title: "2D Artist",
    discipline: "Art",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Draw the worlds, characters, and UI that give our games their hand-made look.",
    responsibilities: [
      "Create 2D environment, character, and prop art",
      "Develop and hold a cohesive hand-inked style",
      "Produce frame-by-frame and rigged animation",
      "Craft in-game UI and key art",
    ],
    requirements: [
      "A portfolio with a strong, intentional style",
      "Fluency in your 2D pipeline of choice",
      "Animation fundamentals",
      "Bonus: pixel art or printmaking background",
    ],
  },
  {
    slug: "3d-artist",
    title: "3D Artist",
    discipline: "Art",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Sculpt the overgrown ruins and stylised props for our first-person worlds.",
    responsibilities: [
      "Model, texture, and dress stylised 3D environments",
      "Build modular kits and material libraries",
      "Partner with engineering on look-dev and optimisation",
      "Keep the silhouette readable and the mood thick",
    ],
    requirements: [
      "Strong stylised 3D portfolio",
      "Blender or Maya, plus Substance",
      "Solid grasp of real-time materials and lighting",
      "Bonus: procedural / Houdini experience",
    ],
  },
  {
    slug: "marketer",
    title: "Marketer",
    discipline: "Marketing",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Own how the world finds out about our games — strategy, campaigns, community, and storefronts.",
    responsibilities: [
      "Plan and run launch and wishlist campaigns",
      "Own Steam/console store pages and analytics",
      "Coordinate press, creators, and events",
      "Grow and nurture the community",
    ],
    requirements: [
      "2+ years in games or entertainment marketing",
      "Data-literate and storefront-savvy",
      "Sharp written voice",
      "Bonus: a network of press and creators",
    ],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    discipline: "Marketing",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Be Cavern's voice and eye online — short-form video, graphics, and a feed people screenshot.",
    responsibilities: [
      "Plan, shoot, and edit short-form video",
      "Design graphics and motion for socials",
      "Run the day-to-day across platforms",
      "Turn devlog moments into shareable stories",
    ],
    requirements: [
      "Strong video editing (Premiere/After Effects/CapCut)",
      "Graphic design chops",
      "An instinct for what travels online",
      "Bonus: motion design or community management",
    ],
  },
  {
    slug: "sound-engineer",
    title: "Sound Engineer",
    discipline: "Audio",
    type: "Full-time",
    location: "Remote",
    blurb:
      "Design the sound of our games — foley, ambiences, implementation, and the quiet moments too.",
    responsibilities: [
      "Design and record SFX and ambiences",
      "Implement audio in Unity (FMOD/Wwise)",
      "Mix for clarity across devices",
      "Collaborate with our composer on the soundscape",
    ],
    requirements: [
      "Game audio design + implementation experience",
      "FMOD or Wwise fluency",
      "Strong field-recording and editing skills",
      "Bonus: composition or middleware scripting",
    ],
  },
];

const TEAM = [
  {
    name: "Ama Boateng",
    role: "Studio Director",
    seed: "Ama-Boateng",
    bio: "Keeps the studio on track and the scope honest.",
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

const SERVICES = [
  {
    no: "01",
    title: "Original Games",
    body: "We make our own worlds, front to back — concept, craft, and ship. Atmospheric, hand-made, unmistakably ours.",
    points: ["Concept & vertical slice", "Full production", "Launch & live"],
  },
  {
    no: "02",
    title: "Co-Development",
    body: "Drop our team into yours for the parts that need a steady hand — gameplay systems, art, audio, or polish.",
    points: ["Gameplay & tools", "Art & animation", "Audio & implementation"],
  },
  {
    no: "03",
    title: "Art & Audio Direction",
    body: "Need our look or sound without the whole studio? We direct and produce custom art and original music.",
    points: ["Style frames & key art", "Original score", "Sound design"],
  },
];

const SITE_SETTINGS = {
  id: "default",
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

async function main() {
  console.log("Seeding games...");
  await db.delete(games);
  await db.insert(games).values(GAMES.map((g, i) => ({ ...g, sortOrder: i })));

  console.log("Seeding news...");
  await db.delete(news);
  await db.insert(news).values(NEWS.map((n, i) => ({ ...n, sortOrder: i })));

  console.log("Seeding jobs...");
  await db.delete(jobs);
  await db.insert(jobs).values(JOBS.map((j, i) => ({ ...j, sortOrder: i })));

  console.log("Seeding team...");
  await db.delete(team);
  await db.insert(team).values(TEAM.map((m, i) => ({ ...m, sortOrder: i })));

  console.log("Seeding services...");
  await db.delete(services);
  await db.insert(services).values(SERVICES.map((s, i) => ({ ...s, sortOrder: i })));

  console.log("Seeding site settings...");
  await db
    .insert(siteSettings)
    .values(SITE_SETTINGS)
    .onConflictDoUpdate({ target: siteSettings.id, set: SITE_SETTINGS });

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
