// app/api/register/route.js

import { NextResponse } from "next/server";
import { connect } from "../../../utlis/dbconfig"; // Adjust path according to your project
import User from "../../../model/user"; // Adjust path according to your project
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, contact, profile_picture } = await req.json();

    if (!name || !email || !password || !contact) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connect(); // Connect to MongoDB

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      contact,
      profile_picture: profile_picture || "", // Optional field
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
