import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error:", err);

    // Don't kill the test runner
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    } else {
      throw err; // Let Jest handle the error if needed
    }
  }
}
