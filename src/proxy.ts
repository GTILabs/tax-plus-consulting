import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic check only: sends visitors without a session cookie to the login page.
 * Every admin page and Server Action still verifies the session against the database.
 */
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/forgot", "/admin/reset"];

export function proxy(request: NextRequest) {
  if (PUBLIC_ADMIN_PATHS.includes(request.nextUrl.pathname) || request.cookies.has("tp_admin")) return NextResponse.next();
  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
