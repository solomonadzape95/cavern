import Link from "next/link";
import { AuthCard } from "@/components/admin/auth/AuthCard";
import { SignInForm } from "@/components/admin/auth/SignInForm";

export default function AdminSignInPage() {
  return (
    <AuthCard
      eyebrow="Cavern Admin"
      title="Sign in"
      subtitle="Sign in to manage Cavern's content."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/admin/sign-up" className="text-olive hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthCard>
  );
}
