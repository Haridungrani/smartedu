import { connect } from "./dbconfig";
import bcrypt from "bcrypt";

async function createAdmin() {
  const client = await connect();
  const db = client.db("smartedu");

  const passwordHash = await bcrypt.hash("admin123", 10);
  await db.collection("admins").insertOne({ email: "admin@example.com", password: passwordHash });
}

createAdmin();
export default createAdmin;
