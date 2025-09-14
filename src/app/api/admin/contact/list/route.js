import { connect } from "../../../../../utlis/dbconfig";
import Contact from "../../../../../model/contact";

export async function GET(req) {
    try {
        await connect();
        const contacts = await Contact.find().sort({ createdAt: -1 }); // fetch all contacts, newest first
        return new Response(JSON.stringify(contacts), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch contacts" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
