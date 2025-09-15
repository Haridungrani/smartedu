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

export async function GET() {
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": `auth-token=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      "Content-Type": "application/json",
    },
  });
}
