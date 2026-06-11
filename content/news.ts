export type Post = {
  slug: string;
  title: string;
  date: string;
  kind: "Devlog" | "Release" | "Studio";
  excerpt: string;
};

export const NEWS: Post[] = [
  {
    slug: "moss-cathedral-reveal",
    title: "Moss Cathedral, revealed",
    date: "2026-05-28",
    kind: "Release",
    excerpt:
      "Our growing-architecture explorer steps into the light. Here's the first trailer and what we learned building a building that builds itself.",
  },
  {
    slug: "inking-4000-frames",
    title: "Inking 4,000 frames by hand",
    date: "2026-04-12",
    kind: "Devlog",
    excerpt:
      "Priya breaks down the pipeline behind Hollow Lantern's animation — and why we still ink the dark by hand.",
  },
  {
    slug: "recording-cellos-in-stairwells",
    title: "Recording cellos in stairwells",
    date: "2026-03-03",
    kind: "Devlog",
    excerpt:
      "Bjorn on capturing the score where the reverb is free and the neighbours are patient.",
  },
  {
    slug: "we-are-hiring-2026",
    title: "We're hiring",
    date: "2026-02-09",
    kind: "Studio",
    excerpt:
      "Six new roles. We're growing the team across engineering, art, audio, and marketing.",
  },
];
