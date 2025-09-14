import { NextResponse } from "next/server";
import { connect } from "../../../../../utlis/dbconfig"; // Adjust path as needed
import User from "../../../../../model/user"; // Adjust path as needed

export async function GET(req) {
    try {
        await connect(); // Connect to MongoDB

        const users = await User.find().sort({ createdAt: -1 }); // Fetch all users, newest first

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
