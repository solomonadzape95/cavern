import { Field, TextInput } from "@/components/admin/fields";
import { MarkdownField } from "@/components/admin/MarkdownField";
import { SubmitButton } from "@/components/admin/SubmitButton";

export function CampaignForm({
  action,
  recipientCount,
}: {
  action: (formData: FormData) => void;
  recipientCount: number;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <Field label="Subject">
        <TextInput name="subject" required />
      </Field>

      <Field
        label="Message"
        hint="Markdown — use the toolbar for headings, bold, lists, and links. The preview shows how it'll read."
      >
        <MarkdownField name="body" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Button label"
          hint="Optional — adds a grunge-style button to the email."
        >
          <TextInput name="ctaLabel" placeholder="Play the demo" />
        </Field>
        <Field label="Button link" hint="Where the button points, e.g. https://…">
          <TextInput
            name="ctaUrl"
            type="url"
            placeholder="https://cavern.studio/games"
          />
        </Field>
      </div>

      <SubmitButton pendingLabel="Sending…">
        Send to {recipientCount} subscriber{recipientCount === 1 ? "" : "s"}
      </SubmitButton>
    </form>
  );
}
