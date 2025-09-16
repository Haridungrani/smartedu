import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const publicAdminPaths = ["/admin/login"];
    if (publicAdminPaths.includes(pathname)) {
      return NextResponse.next();
    }

    const token = req.cookies.get("admin-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname.startsWith("/course") || pathname.startsWith("/developer")) {
    const userToken = req.cookies.get("user-token")?.value;
    const adminToken = req.cookies.get("admin-token")?.value;
    if (!userToken && !adminToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/course/:path*", "/developer/:path*"],
};
