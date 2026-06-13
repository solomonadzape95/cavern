import { Field, TextInput, TextArea } from "@/components/admin/fields";
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

      <Field label="Message" hint="Plain text — separate paragraphs with a blank line.">
        <TextArea name="body" required className="min-h-64" />
      </Field>

      <SubmitButton pendingLabel="Sending…">
        Send to {recipientCount} subscriber{recipientCount === 1 ? "" : "s"}
      </SubmitButton>
    </form>
  );
}
