import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  flag: String,
  difficulty: String
});

export default mongoose.model("Challenge", challengeSchema);
