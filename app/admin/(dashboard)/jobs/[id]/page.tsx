import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/dal";
import { getJobById } from "@/lib/data/jobs";
import { JobForm } from "../JobForm";
import { updateJob } from "../actions";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("jobs");
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="label text-canvas/60">Editing job</p>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">{job.title}</h1>
      </div>
      <JobForm job={job} action={updateJob.bind(null, job.id)} />
    </div>
  );
}
