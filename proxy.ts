import { NextResponse } from "next/server";

import { auth } from "@/auth";

const LOGIN_PATH = "/login";

const DEFAULT_AUTHENTICATED_PATH = "/dashboard";

// Next.js 16 proxy (formerly middleware). Reuses the existing Auth.js
// configuration — with the JWT session strategy this only decodes the
// session cookie, so it is Edge-safe and does not hit the database.
export default auth((req) => {
  const isAuthenticated = Boolean(req.auth?.user?.id);
  const { pathname } = req.nextUrl;

  // The Auth.js wrapper rewrites req.nextUrl to the configured origin
  // (AUTH_URL), which may not match the host the request actually arrived
  // on — rebuild redirect targets from the original Host header instead.
  const host =
    req.headers.get("x-forwarded-host") ??
    req.headers.get("host") ??
    req.nextUrl.host;

  const protocol =
    req.headers.get("x-forwarded-proto") ??
    req.nextUrl.protocol.replace(/:$/, "");

  const origin = `${protocol}://${host}`;

  // The only public page route: authenticated users are sent to the
  // dashboard, everyone else can stay and sign in.
  if (pathname === LOGIN_PATH) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_AUTHENTICATED_PATH, origin));
    }

    return NextResponse.next();
  }

  // Every other matched route requires an authenticated, provisioned user.
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_PATH, origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Protect all page routes, except:
     * - /api/* route handlers — they enforce their own authentication and
     *   return 401 JSON (and /api/auth/* must stay reachable for Auth.js)
     * - _next/static and _next/image build assets
     * - favicon.ico and public asset files
     */
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|woff|woff2)$).*)",
  ],
};
