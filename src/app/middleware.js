import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies, url } = req;

  // Only protect /admin pages except login
  if (url.includes("/admin") && !url.endsWith("/login")) {
    const token = cookies.get("admin-token");
    if (!token) return NextResponse.redirect("/admin/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all /admin routes
};
