import createAdmin from "../../../../utlis/insertadmin"; // MongoDB Atlas connection
import bcrypt from "bcryptjs"; // <-- use bcryptjs
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const client = await createAdmin();
    const db = client.db("smartedu");

    const admin = await db.collection("admins").findOne({ email });
    if (!admin) return new Response(JSON.stringify({ error: "Admin not found" }), { status: 401 });

    const match = await bcrypt.compare(password, admin.password); // works with bcryptjs
    if (!match) return new Response(JSON.stringify({ error: "Incorrect password" }), { status: 401 });

    // Set cookie
    const cookie = serialize("admin-token", email, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return new Response(JSON.stringify({ message: "Login success" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
