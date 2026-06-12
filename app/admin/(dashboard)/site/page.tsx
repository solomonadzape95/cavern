import { requirePermission } from "@/lib/auth/dal";
import { getSiteSettings } from "@/lib/data/site";
import { SiteForm } from "./SiteForm";
import { updateSiteSettings } from "./actions";

export default async function AdminSitePage() {
  await requirePermission("site");
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">Site settings</h1>
        <p className="mt-1 text-canvas/60">
          Contact details and social links used across the site.
        </p>
      </div>
      <SiteForm settings={settings} action={updateSiteSettings} />
    </div>
  );
}
