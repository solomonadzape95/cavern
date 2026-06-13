import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { getSubscribers, getCampaigns } from "@/lib/data/newsletter";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSubscriber } from "./actions";

function fmtDate(date: Date | string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminNewsletterPage() {
  await requirePermission("newsletter");
  const [subscribers, campaigns] = await Promise.all([getSubscribers(), getCampaigns()]);
  const activeCount = subscribers.filter((s) => s.status === "subscribed").length;

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-(length:--text-title) text-canvas-deep">Newsletter</h1>
          <p className="mt-1 text-canvas/60">
            {activeCount} active subscriber{activeCount === 1 ? "" : "s"}.
          </p>
        </div>
        <Link href="/admin/newsletter/new" className="label bg-moss px-4 py-2 text-paper">
          New campaign
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-xl text-canvas-deep">Campaigns</h2>
        <DataTable
          items={campaigns}
          columns={[
            { header: "Subject", cell: (c) => c.subject },
            { header: "Recipients", cell: (c) => c.recipientCount },
            { header: "Sent", cell: (c) => fmtDate(c.sentAt) },
          ]}
          empty="No campaigns sent yet."
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl text-canvas-deep">Subscribers</h2>
        <DataTable
          items={subscribers}
          columns={[
            { header: "Email", cell: (s) => s.email },
            {
              header: "Status",
              cell: (s) => (s.status === "subscribed" ? "Subscribed" : "Unsubscribed"),
            },
            { header: "Since", cell: (s) => fmtDate(s.subscribedAt) },
          ]}
          rowActions={(s) => (
            <DeleteButton
              action={deleteSubscriber.bind(null, s.id)}
              label="Remove"
              confirmMessage={`Remove ${s.email} from the newsletter? This can't be undone.`}
            />
          )}
          empty="No subscribers yet."
        />
      </section>
    </div>
  );
}
