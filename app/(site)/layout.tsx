import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { TornFilters } from "@/components/ui/TornFilters";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { HiringToast } from "@/components/chrome/HiringToast";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { NewsletterButton } from "@/components/chrome/NewsletterButton";
import NavLoadingOverlay from "@/components/chrome/NavLoadingOverlay";
import { getSiteSettings } from "@/lib/data/site";
import { getJobs } from "@/lib/data/jobs";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, jobs] = await Promise.all([getSiteSettings(), getJobs()]);

  return (
    <>
      <TornFilters />
      <GrainOverlay />
      <SiteHeader settings={settings} />
      <NavLoadingOverlay />
      <HiringToast jobsCount={jobs.length} />
      {children}
      <SiteFooter settings={settings} />
      <NewsletterButton />
    </>
  );
}
