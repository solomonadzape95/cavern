import { Field, TextInput } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { RESOURCE_NAV } from "@/lib/admin/nav";
import type { AdminWithPermissions } from "@/lib/data/admins";

export function AdminForm({
  admin,
  action,
}: {
  admin?: AdminWithPermissions;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-11/12 space-y-6">
      {admin ? (
        <Field label="Email">
          <TextInput value={admin.email} disabled />
        </Field>
      ) : (
        <Field label="Email" hint="They'll be linked to this admin the first time they sign in">
          <TextInput type="email" name="email" required />
        </Field>
      )}

      <Field label="Name" hint="Optional — shown in the sidebar once they sign in.">
        <TextInput name="name" defaultValue={admin?.name ?? ""} />
      </Field>

      {admin?.role === "superadmin" ? (
        <p className="text-canvas/60">Superadmins have access to everything.</p>
      ) : (
        <fieldset className="space-y-2">
          <legend className="label text-canvas/60">Access</legend>
          <p className="text-sm text-canvas/50">Choose which sections this admin can manage.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {RESOURCE_NAV.map((item) => (
              <label key={item.resource} className="flex items-center gap-2 text-canvas-deep">
                <input
                  type="checkbox"
                  name="permissions"
                  value={item.resource}
                  defaultChecked={admin?.permissions.includes(item.resource)}
                  className="accent-moss"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <SubmitButton>{admin ? "Save changes" : "Invite admin"}</SubmitButton>
    </form>
  );
}
