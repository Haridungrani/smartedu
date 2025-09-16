// src/app/api/admin/user/list/route.js
import { connect } from "../../../../../utils/dbconfig";
import User from "../../../../../model/user";

export async function GET() {
  try {
    await connect();
    const totalUsers = await User.countDocuments();

    return new Response(JSON.stringify({ totalUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch total users" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
