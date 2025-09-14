import { connect } from "../../../../../utlis/dbconfig";
import Contact from "../../../../../model/contact";



export async function GET() {
  try {
    await connect();
    const totalContact = await Contact.countDocuments();
    return new Response(JSON.stringify({ totalContact }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch total contacts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

