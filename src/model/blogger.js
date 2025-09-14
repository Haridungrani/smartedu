// models/Blogger.ts
// models/Blogger.js
import mongoose from "mongoose";

const BloggerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
}, { timestamps: true });

const Blogger = mongoose.models.Blogger || mongoose.model("Blogger", BloggerSchema);
export default Blogger;
