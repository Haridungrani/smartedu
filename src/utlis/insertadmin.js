// utils/insertAdmin.js
import { connect } from "./dbconfig";
import Admin from "../model/admin"; // define admin schema

async function insertAdmin() {
  await connect();

  const adminExists = await Admin.findOne({ email: "admin@example.com" });
  if (adminExists) {
    console.log("Admin already exists");
    return;
  }

  const newAdmin = new Admin({
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // Use hashing in production!
    role: "admin"
  });

  await newAdmin.save();
  console.log("Admin user created");
}

insertAdmin().then(() => process.exit());
