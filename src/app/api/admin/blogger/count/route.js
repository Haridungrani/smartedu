import { connect } from "../../../../../utlis/dbconfig";
import Blogger from "../../../../../model/blogger";

export async function GET() {
  try {
    await connect();
    const totalBloggers = await Blogger.countDocuments();
    return new Response(JSON.stringify({ totalBloggers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch total bloggers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
