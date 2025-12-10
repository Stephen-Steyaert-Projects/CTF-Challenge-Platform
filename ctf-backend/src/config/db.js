import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    if (process.env.NODE_ENV === "test") {
      console.log("Skipping connectDB in test mode (MONGO_URI not set)");
      return;
    } else {
      console.error("MONGO_URI is not defined!");
      process.exit(1);
    }
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err);

    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    } else {
      throw err;
    }
  }
}
