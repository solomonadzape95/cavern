import { Hero } from "@/components/sections/Hero";
import { GamesSection } from "@/components/sections/GamesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteSettings } from "@/lib/data/site";
import { getGames } from "@/lib/data/games";
import { getTeam } from "@/lib/data/team";
import { getServices } from "@/lib/data/services";

export default async function Home() {
  const [settings, games, team, services] = await Promise.all([
    getSiteSettings(),
    getGames(),
    getTeam(),
    getServices(),
  ]);

  return (
    <>
      <Hero founded={settings.founded} tagline={settings.tagline} />
      <GamesSection games={games} />
      <ServicesSection services={services} />
      <TeamSection team={team} />
      <ContactSection email={settings.email} location={settings.location} />
    </>
  );
}
