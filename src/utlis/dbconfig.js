import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
   if (!process.env.MONGO_URI) {
        throw new Error("Please define the MONGO_URI environment variable inside .env.local");
    }

  try {
await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};