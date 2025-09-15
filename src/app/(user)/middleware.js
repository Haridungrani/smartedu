import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("auth-token");
  const url = req.nextUrl.clone();

  // Protect these routes
  const protectedRoutes = ["/course", "/developer"];
  const isProtected = protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtected) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/course/:path*", "/developer/:path*"],
};
