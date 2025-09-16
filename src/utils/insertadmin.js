// scripts/insertAdmin.js (Mongoose or native driver kept as utility)
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not defined in .env.local");
    return;
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("smartedu");
    const email = "admin@example.com";
    const Password = "admin123";
    const hashedPassword = await bcrypt.hash(Password, 10);
    // Create admin if not exists (avoid duplicate key 11000)
    const result = await db.collection("admins").updateOne(
      { email },
      { $setOnInsert: { email, password: hashedPassword } },
      { upsert: true }
    );
    if (result.upsertedCount === 1) {
      console.log("Admin inserted with ID:", result.upsertedId._id);
    } else {
      console.log("Admin already exists:", email);
    }
  } catch (err) {
    console.error("Error inserting admin:", err);
  } finally {
    await client.close();
  }
}

run();

export default async function createAdmin() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}


