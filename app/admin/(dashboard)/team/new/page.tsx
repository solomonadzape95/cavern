import { requirePermission } from "@/lib/auth/dal";
import { MemberForm } from "../MemberForm";
import { createMember } from "../actions";

export default async function NewMemberPage() {
  await requirePermission("team");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">New member</h1>
        <p className="mt-1 text-canvas/60">Add someone to your team page.</p>
      </div>
      <MemberForm action={createMember} />
    </div>
  );
}
