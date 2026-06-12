import { Field, TextInput, TextArea } from "@/components/admin/fields";
import { RepeatableTextList } from "@/components/admin/RepeatableTextList";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Job } from "@/db/schema";

export function JobForm({
  job,
  action,
}: {
  job?: Job;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <TextInput name="title" defaultValue={job?.title} required />
        </Field>
        <Field
          label="Page URL"
          hint="The address for this job's page, e.g. /jobs/gameplay-programmer."
        >
          <TextInput
            name="slug"
            defaultValue={job?.slug}
            pattern="[a-z0-9-]+"
            required
          />
        </Field>
        <Field label="Discipline" hint="e.g. Engineering, Art, Design">
          <TextInput name="discipline" defaultValue={job?.discipline} required />
        </Field>
        <Field label="Type" hint="e.g. Full-time, Contract">
          <TextInput name="type" defaultValue={job?.type} required />
        </Field>
        <Field label="Location">
          <TextInput name="location" defaultValue={job?.location} required />
        </Field>
      </div>

      <Field label="Blurb" hint="A short summary shown in the jobs list.">
        <TextArea name="blurb" defaultValue={job?.blurb} required />
      </Field>

      <Field
        label="Application form link"
        hint="Where the 'Continue' button on the apply page sends candidates, e.g. a Google Form. Leave blank to email applications instead."
      >
        <TextInput
          type="url"
          name="formLink"
          defaultValue={job?.formLink ?? ""}
          placeholder="https://forms.gle/…"
        />
      </Field>

      <RepeatableTextList
        name="responsibilities"
        label="Responsibilities"
        initial={job?.responsibilities}
      />
      <RepeatableTextList
        name="requirements"
        label="Requirements"
        initial={job?.requirements}
      />

      <SubmitButton>{job ? "Save changes" : "Create job"}</SubmitButton>
    </form>
  );
}
