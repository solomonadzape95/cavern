"use client";

import { ClerkLoaded, ClerkLoading, useSignUp } from "@clerk/nextjs";
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

function SignUpFields() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const [step, setStep] = useState<"details" | "verify">("details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const isSubmitting = fetchStatus === "fetching";

  async function finalize() {
    await signUp.finalize({ navigate: () => router.push("/admin") });
  }

  async function handleDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await signUp.password({
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      emailAddress,
      password,
    });
    if (error) return;

    if (signUp.status === "complete") {
      await finalize();
      return;
    }

    if (signUp.unverifiedFields.includes("email_address")) {
      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) return;
      setStep("verify");
    }
  }

  async function handleVerifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) return;

    if (signUp.status === "complete") {
      await finalize();
    }
  }

  async function handleGoogleSignUp() {
    await signUp.sso({
      strategy: "oauth_google",
      redirectUrl: "/admin",
      redirectCallbackUrl: "/admin/sso-callback",
    });
  }

  if (step === "verify") {
    return (
      <form onSubmit={handleVerifySubmit} className="space-y-4">
        <AuthGlobalError errors={errors} />

        <p className="text-canvas/60">
          Enter the code we sent to {signUp.emailAddress ?? "your email"}.
        </p>

        <div>
          <label htmlFor="code" className="label text-canvas/60 block">
            Verification code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className={`mt-1.5 ${authInputClass}`}
          />
          <AuthFieldError error={errors.fields.code} />
        </div>

        <button type="submit" disabled={isSubmitting} className={authButtonClass}>
          {isSubmitting ? "Verifying…" : "Verify email"}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <AuthGlobalError errors={errors} />

      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isSubmitting}
        className={authSecondaryButtonClass}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <AuthDivider />

      <form onSubmit={handleDetailsSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="label text-canvas/60 block">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={`mt-1.5 ${authInputClass}`}
            />
            <AuthFieldError error={errors.fields.firstName} />
          </div>

          <div>
            <label htmlFor="lastName" className="label text-canvas/60 block">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={`mt-1.5 ${authInputClass}`}
            />
            <AuthFieldError error={errors.fields.lastName} />
          </div>
        </div>

        <div>
          <label htmlFor="emailAddress" className="label text-canvas/60 block">
            Email
          </label>
          <input
            id="emailAddress"
            type="email"
            autoComplete="email"
            required
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            className={`mt-1.5 ${authInputClass}`}
          />
          <AuthFieldError error={errors.fields.emailAddress} />
        </div>

        <div>
          <label htmlFor="password" className="label text-canvas/60 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`mt-1.5 ${authInputClass}`}
          />
          <AuthFieldError error={errors.fields.password} />
        </div>

        <button type="submit" disabled={isSubmitting} className={authButtonClass}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </form>
    </div>
  );
}

export function SignUpForm() {
  return (
    <>
      <ClerkLoading>
        <p className="text-canvas/60">Loading…</p>
      </ClerkLoading>
      <ClerkLoaded>
        <SignUpFields />
      </ClerkLoaded>
    </>
  );
}
