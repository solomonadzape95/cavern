import { Hero } from "@/components/sections/Hero";
import { GamesSection } from "@/components/sections/GamesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <GamesSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />

    </>
  );
}
