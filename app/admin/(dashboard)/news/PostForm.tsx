import { Field, TextInput, TextArea, Select } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { newsKind, type Post } from "@/db/schema";

export function PostForm({
  post,
  action,
}: {
  post?: Post;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <TextInput name="title" defaultValue={post?.title} required />
        </Field>
        <Field
          label="Page URL"
          hint="The address for this post's page, e.g. /news/hollow-lantern-devlog-1. Leave blank to generate it from the title — spaces and capitals are tidied automatically."
        >
          <TextInput name="slug" defaultValue={post?.slug} />
        </Field>
        <Field label="Date">
          <TextInput
            type="date"
            name="date"
            defaultValue={post?.date}
            required
          />
        </Field>
        <Field
          label="Type"
          hint="Controls the label shown on the post — Devlog, Release, or Studio update."
        >
          <Select name="kind" defaultValue={post?.kind ?? newsKind.enumValues[0]} required>
            {newsKind.enumValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Summary" hint="A short teaser shown in the news list.">
        <TextArea name="excerpt" defaultValue={post?.excerpt} required />
      </Field>

      <SubmitButton>{post ? "Save changes" : "Create post"}</SubmitButton>
    </form>
  );
}
