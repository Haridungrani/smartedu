// app/api/blogger/register/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../utils/dbconfig";
import Blogger from "../../../../model/blogger";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password, contact } = await req.json();

        if (!name || !email || !password || !contact) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connect();

        const existingBlogger = await Blogger.findOne({ email });
        if (existingBlogger) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const blogger = new Blogger({
            name,
            email,
            password: hashedPassword,
            contact,
        });

        await blogger.save();

        return NextResponse.json({ message: "Blogger registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
