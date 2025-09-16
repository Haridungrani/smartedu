// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST(req) {
//   const cookieStore = cookies();
//   cookieStore.delete("userEmail", { path: "/" });

//   return NextResponse.json({ message: "Logged out" });
// }

// export async function POST(req) {
//   return new Response(
//     JSON.stringify({ message: "Logged out" }),
//     {
//       status: 200,
//       headers: {
//         "Set-Cookie": `auth-token=; Path=/; HttpOnly; Max-Age=0`,
//       },
//     }
//   );
// }

// import { NextResponse } from "next/server";

// export async function GET() {
//   return new Response(JSON.stringify({ message: "Logged out" }), {
//     status: 200,
//     headers: {
//       "Set-Cookie": `auth-token=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
//       "Content-Type": "application/json",
//     },
//   });
// }

import { NextResponse } from "next/server";

function clearAllUserCookies() {
  const res = NextResponse.json({ message: "Logged out" });
  // Clear current and legacy cookie names
  const clear = (name) => res.cookies.set(name, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  clear("user-token");
  clear("auth-token");
  return res;
}

export async function GET() {
  return clearAllUserCookies();
}

export async function POST() {
  return clearAllUserCookies();
}
