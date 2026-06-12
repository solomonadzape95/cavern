import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Everything under /admin is protected…
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
// …except the sign-in/sign-up pages themselves, or you'd get a redirect loop.
const isPublicAdminRoute = createRouteMatcher([
  "/admin/sign-in(.*)",
  "/admin/sign-up(.*)",
  "/admin/sso-callback(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req) && !isPublicAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
