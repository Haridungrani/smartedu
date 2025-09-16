// app/api/blogger/login/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../utils/dbconfig";
import Blogger from "../../../../model/blogger";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connect();

    const blogger = await Blogger.findOne({ email });
    if (!blogger) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, blogger.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // You can create a session, JWT token, or return blogger details here
    return NextResponse.json({
      message: "Login successful",
      blogger: {
        id: blogger._id,
        name: blogger.name,
        email: blogger.email,
        contact: blogger.contact,
      },
    }, { status: 200 });
    
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
