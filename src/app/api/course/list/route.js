import { connect } from "../../../../utils/dbconfig";
import Course from "../../../../model/course";
import jwt from "jsonwebtoken";

export async function GET(req) {
  // Require valid user token
  const cookieHeader = req.headers.get("cookie") || "";
  const token = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("user-token="))
    ?.split("=")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  await connect();

  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ courses }), {
      status: 200,
      headers: { "Cache-Control": "no-store", Vary: "Cookie" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), {
      status: 500,
      headers: { "Cache-Control": "no-store", Vary: "Cookie" },
    });
  }
}


