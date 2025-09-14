import { connect } from "../../../../../utlis/dbconfig";
import Course from "../../../../../model/course";

export async function GET() {
  await connect();

  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ courses }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch courses" }), { status: 500 });
  }
}
