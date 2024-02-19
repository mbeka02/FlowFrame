import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, request) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }
      const orgSelection = new URL(path, request.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      //after sign-in return the user to the previous page they tried to access
      return redirectToSignIn({ returnBackUrl: request.url });
    }
    if (
      auth.userId &&
      !auth.orgId &&
      request.nextUrl.pathname !== "/select-org"
    ) {
      const orgSelection = new URL("/select-org", request.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
