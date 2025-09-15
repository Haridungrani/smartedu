// // app/api/admin/register/route.js
// import { NextResponse } from "next/server";
// import { connect } from "../../../../utlis/dbconfig";
// import Admin from "../../../../model/admin";

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();

//     await connect();

//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return NextResponse.json({ error: "Email already registered" }, { status: 400 });
//     }

//     const newAdmin = new Admin({
//       name,
//       email,
//       password, // In production, hash this!
//       role: "admin"
//     });

//     await newAdmin.save();

//     return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 });

//   } catch (error) {
//     console.error("Admin registration error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
