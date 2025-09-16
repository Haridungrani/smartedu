// import { getAdminFromCookie } from "../../../../utils/auth"; // your helper function

// export async function GET(req) {
//   const admin = await getAdminFromCookie(req);
//   if (!admin) {
//     return new Response(JSON.stringify({ error: "Not logged in" }), {
//       status: 401,
//     });
//   }
//   return new Response(JSON.stringify({ email: admin.email }), { status: 200 });
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("admin-token")?.value;  // admin cookie
    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const admin = jwt.verify(token, process.env.JWT_SECRET);
    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ email: admin.email });
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
