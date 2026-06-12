import Link from "next/link";
import { AuthCard } from "@/components/admin/auth/AuthCard";
import { SignUpForm } from "@/components/admin/auth/SignUpForm";

export default function AdminSignUpPage() {
  return (
    <AuthCard
      eyebrow="Cavern Admin"
      title="Create account"
      subtitle="Sign up, then ask a superadmin to grant you access."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/admin/sign-in" className="text-olive hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}
