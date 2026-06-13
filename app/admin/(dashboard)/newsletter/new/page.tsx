import { requirePermission } from "@/lib/auth/dal";
import { getActiveSubscribers } from "@/lib/data/newsletter";
import { CampaignForm } from "../CampaignForm";
import { sendCampaign } from "../actions";

export default async function NewCampaignPage() {
  await requirePermission("newsletter");
  const subscribers = await getActiveSubscribers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">New campaign</h1>
        <p className="mt-1 text-canvas/60">
          Compose an update to send to everyone subscribed to the newsletter.
        </p>
      </div>
      <CampaignForm action={sendCampaign} recipientCount={subscribers.length} />
    </div>
  );
}
