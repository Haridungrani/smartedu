// export async function POST(req) {
//   return new Response(
//     JSON.stringify({ message: "Logged out successfully" }),
//     {
//       status: 200,
//       headers: {
//         "Set-Cookie": `auth-token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
//       },
//     }
//   );
// }
import { serialize } from "cookie";

export async function POST(req) {
  const cookie = serialize("admin-token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // Expire immediately
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
