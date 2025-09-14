// app/api/admin/blogger/list/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../../utlis/dbconfig";
import Blogger from "../../../../../model/blogger";

export async function GET() {
  try {
    await connect();

    const bloggers = await Blogger.find({}, "name email contact"); // Only return name, email, contact

    return NextResponse.json(bloggers, { status: 200 });
  } catch (error) {
    console.error("Error fetching bloggers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
