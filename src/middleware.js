// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req) {
//   const protectedPaths = ["/course", "/developer"]; // paths to protect
//   if (!protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   const token = req.cookies.get("auth-token")?.value;
//   if (!token) return NextResponse.redirect(new URL("/login", req.url));

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// // Apply middleware only to specific routes
// export const config = {
//   matcher: ["/course/:path*", "/developer/:path*"],
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const protectedPaths = ["/course", "/developer"];
  if (!protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) return NextResponse.next();

  const token = req.cookies.get("auth-token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/course/:path*", "/developer/:path*"],
};
