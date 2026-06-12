import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/dal";
import { getMemberById } from "@/lib/data/team";
import { MemberForm } from "../MemberForm";
import { updateMember } from "../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("team");
  const { id } = await params;
  const member = await getMemberById(id);
  if (!member) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="label text-canvas/60">Editing member</p>
        <h1 className="font-display text-(length:--text-title) text-canvas-deep">{member.name}</h1>
      </div>
      <MemberForm member={member} action={updateMember.bind(null, member.id)} />
    </div>
  );
}
