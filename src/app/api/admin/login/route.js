// // app/api/admin/login/route.js
// import { NextResponse } from "next/server";
// import { connect } from "../../../../utlis/dbconfig";
// import Admin from "../../../../model/admin";
// import { serialize } from "cookie";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();
//     await connect();

//     const user = await Admin.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     if (user.role !== "admin") {
//       return NextResponse.json({ error: "Access denied: Not an admin" }, { status: 403 });
//     }
//     if (user.password !== password) {
//       return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
//     }

//     const token = Buffer.from(JSON.stringify({ email: user.email, role: user.role })).toString("base64");

//     const response = NextResponse.json({
//       message: "Login successful",
//       user: { name: user.name, email: user.email }
//     }, { status: 200 });

//     response.headers.set("Set-Cookie", serialize("auth-token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60 * 24,
//     }));

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
