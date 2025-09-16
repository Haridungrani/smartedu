import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("user-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const res = NextResponse.json({ email: user.email, id: user.id, role: user.role || "user" });
    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (err) {
    const res = NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    res.headers.set("Cache-Control", "no-store");
    return res;
  }
}
