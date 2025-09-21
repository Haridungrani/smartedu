// import mongoose from "mongoose";

// let isConnected = false;

// export const connect = async () => {
//   if (isConnected) {
//     console.log("Already connected to MongoDB");
//     return;
//   }
//    if (!process.env.MONGO_URI) {
//         throw new Error("Please define the MONGO_URI environment variable inside .env.local");
//     }

//   try {
// await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// };

MONGO_URI = mongodb + srv://jagodanaabhay_db_user:meet5038@cluster0.bdvcquw.mongodb.net/smartedu?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = 6f3d9a2b8c1e4f7d9b0a5c2e8f1d4b3a
