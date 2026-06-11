export type Job = {
  slug: string;
  title: string;
  discipline: string;
  type: string;
  location: string;
  blurb: string;
  responsibilities: string[];
  requirements: string[];
};

export const JOBS: Job[] = [
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

export function getJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}
