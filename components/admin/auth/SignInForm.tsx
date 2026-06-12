"use client";

import { ClerkLoaded, ClerkLoading, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AuthDivider,
  AuthFieldError,
  AuthGlobalError,
  GoogleIcon,
  authButtonClass,
  authInputClass,
  authSecondaryButtonClass,
} from "./AuthCard";

function SignInFields() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitting = fetchStatus === "fetching";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await signIn.password({ identifier, password });
    if (error) return;

    if (signIn.status === "complete") {
      await signIn.finalize({ navigate: () => router.push("/admin") });
    }
  }

  async function handleGoogleSignIn() {
    await signIn.sso({
      strategy: "oauth_google",
      redirectUrl: "/admin",
      redirectCallbackUrl: "/admin/sso-callback",
    });
  }

  return (
    <div className="space-y-4">
      <AuthGlobalError errors={errors} />

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
        className={authSecondaryButtonClass}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="label text-canvas/60 block">
            Email
          </label>
          <input
            id="identifier"
            type="email"
            autoComplete="email"
            required
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            className={`mt-1.5 ${authInputClass}`}
          />
          <AuthFieldError error={errors.fields.identifier} />
        </div>

        <div>
          <label htmlFor="password" className="label text-canvas/60 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`mt-1.5 ${authInputClass}`}
          />
          <AuthFieldError error={errors.fields.password} />
        </div>

        <button type="submit" disabled={isSubmitting} className={authButtonClass}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export function SignInForm() {
  return (
    <>
      <ClerkLoading>
        <p className="text-canvas/60">Loading…</p>
      </ClerkLoading>
      <ClerkLoaded>
        <SignInFields />
      </ClerkLoaded>
    </>
  );
}
