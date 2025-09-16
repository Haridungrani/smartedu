import { connect } from "../../../utils/dbconfig";
import Contact from "../../../model/contact";

export async function POST(req) {
    await connect();

    const { name, email, comment } = await req.json();

    if (!name || !email || !comment) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    

    try {
        const newContact = new Contact({ name, email, comment });
        await newContact.save();

        return new Response(JSON.stringify({ message: "Message sent successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 });
    }
}
