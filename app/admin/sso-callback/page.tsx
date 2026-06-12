import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { AuthCard } from "@/components/admin/auth/AuthCard";

export default function AdminSsoCallbackPage() {
  return (
    <AuthCard eyebrow="Cavern Admin" title="Signing you in" subtitle="One moment…">
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/admin"
        signUpFallbackRedirectUrl="/admin"
      />
    </AuthCard>
  );
}
