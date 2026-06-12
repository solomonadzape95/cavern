import { requirePermission } from "@/lib/auth/dal";
import { JobForm } from "../JobForm";
import { createJob } from "../actions";

export default async function NewJobPage() {
  await requirePermission("jobs");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">New job</h1>
        <p className="mt-1 text-canvas/60">Post a new open role.</p>
      </div>
      <JobForm action={createJob} />
    </div>
  );
}
