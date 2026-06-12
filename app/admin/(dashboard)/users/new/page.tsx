import { requireSuperadmin } from "@/lib/auth/dal";
import { AdminForm } from "../AdminForm";
import { inviteAdmin } from "../actions";

export default async function NewAdminPage() {
  await requireSuperadmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">Invite admin</h1>
        <p className="mt-1 text-canvas/60">
          Send an email invite so they can sign in and manage the site.
        </p>
      </div>
      <AdminForm action={inviteAdmin} />
    </div>
  );
}
