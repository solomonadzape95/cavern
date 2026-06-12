import { UserButton } from "@clerk/nextjs";

export default function NoAccessPage() {
  return (
    <div className="bg-canvas text-paper flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <p className="label text-sage">Cavern Admin</p>
      <h1 className="font-display text-(length:--text-heading) text-paper">
        No access yet
      </h1>
      <p className="max-w-[40ch] text-sage">
        Your account isn&rsquo;t set up as a Cavern admin. Ask a superadmin to grant
        you access, or sign in with a different account.
      </p>
      <UserButton />
    </div>
  );
}
