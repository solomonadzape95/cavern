export type Service = {
  no: string;
  title: string;
  body: string;
  points: string[];
};

export const SERVICES: Service[] = [
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
