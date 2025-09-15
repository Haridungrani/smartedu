import { NextResponse } from "next/server";
import { connect } from "../../../utlis/dbconfig";
import User from "../../../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    await connect();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("auth-token", token, { httpOnly: true, path: "/" });
    return res;

  } catch (err) {
    console.error("Login error:", err); // ✅ Log the error to console
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), { status: 500 });
  }
}
