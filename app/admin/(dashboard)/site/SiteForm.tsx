import { Field, TextInput, TextArea } from "@/components/admin/fields";
import { RepeatableGroupList } from "@/components/admin/RepeatableGroupList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { SiteSettings } from "@/db/schema";

export function SiteForm({
  settings,
  action,
}: {
  settings: SiteSettings;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Studio name">
          <TextInput name="name" defaultValue={settings.name} required />
        </Field>
        <Field
          label="Short name"
          hint="A shorter version of your studio name, used where space is limited."
        >
          <TextInput name="short" defaultValue={settings.short} required />
        </Field>
        <Field label="Tagline" hint="A short line describing your studio.">
          <TextInput name="tagline" defaultValue={settings.tagline} required />
        </Field>
        <Field label="Founded" hint="The year your studio started, shown in the footer.">
          <TextInput type="number" name="founded" defaultValue={settings.founded} required />
        </Field>
        <Field label="Contact email" hint="Your main email address, shown in the footer.">
          <TextInput type="email" name="email" defaultValue={settings.email} required />
        </Field>
        <Field label="Press email" hint="For media and press inquiries.">
          <TextInput type="email" name="pressEmail" defaultValue={settings.pressEmail} required />
        </Field>
        <Field label="Location" hint="City and country, shown in the footer.">
          <TextInput name="location" defaultValue={settings.location} required />
        </Field>
      </div>

      <Field label="Blurb" hint="A short paragraph about your studio, shown on the About page.">
        <TextArea name="blurb" defaultValue={settings.blurb} required />
      </Field>

      <RepeatableGroupList
        name="socials"
        label="Socials"
        fields={[
          { key: "label", label: "Label", placeholder: "e.g. Bluesky" },
          { key: "href", label: "URL", placeholder: "https://…" },
          { key: "handle", label: "Handle", placeholder: "@cavern.studio" },
        ]}
        initial={settings.socials}
      />

      <SubmitButton>Save changes</SubmitButton>
    </form>
  );
}
