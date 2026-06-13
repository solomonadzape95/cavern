import Image from "next/image";
import { Field, TextInput, TextArea, FileInput } from "@/components/admin/fields";
import { RepeatableGroupList } from "@/components/admin/RepeatableGroupList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Member } from "@/db/schema";
import { avatar } from "@/lib/art";

export function MemberForm({
  member,
  action,
}: {
  member?: Member;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <TextInput name="name" defaultValue={member?.name} required />
        </Field>
        <Field label="Role">
          <TextInput name="role" defaultValue={member?.role} required />
        </Field>
        <Field
          label="Photo"
          hint="Optional — falls back to a generated avatar based on their name."
        >
          <div className="flex items-center gap-4">
            <Image
              src={member?.image || avatar(member?.name || "preview")}
              alt=""
              width={64}
              height={64}
              className="size-16 shrink-0 border border-sage/30 object-cover"
              unoptimized
            />
            <FileInput name="imageFile" accept="image/*" className="flex-1" />
          </div>
        </Field>
      </div>

      <Field label="Bio">
        <TextArea name="bio" defaultValue={member?.bio} required />
      </Field>

      <RepeatableGroupList
        name="links"
        label="Links"
        fields={[
          { key: "label", label: "Label", placeholder: "e.g. Bluesky" },
          { key: "href", label: "URL", placeholder: "https://…" },
        ]}
        initial={member?.links}
      />

      <SubmitButton>{member ? "Save changes" : "Add member"}</SubmitButton>
    </form>
  );
}
