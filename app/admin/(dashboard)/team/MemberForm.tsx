import { Field, TextInput, TextArea } from "@/components/admin/fields";
import { RepeatableGroupList } from "@/components/admin/RepeatableGroupList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Member } from "@/db/schema";

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
          label="Photo URL"
          hint="Link to their photo. Leave blank to use a generated avatar instead."
        >
          <TextInput type="url" name="image" defaultValue={member?.image ?? ""} />
        </Field>
        <Field
          label="Avatar key"
          hint="A unique word (e.g. their name) used to generate their placeholder avatar if no photo is set"
        >
          <TextInput name="seed" defaultValue={member?.seed} required />
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
