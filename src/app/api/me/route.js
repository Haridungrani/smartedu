// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   try {
//     const token = req.cookies.get("auth-token")?.value;
//     if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

//     const admin = jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({ email: admin.email });
//   } catch (err) {
//     return NextResponse.json({ error: "Invalid or expired token" }, { status: 405 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    const admin = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ email: admin.email });
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
