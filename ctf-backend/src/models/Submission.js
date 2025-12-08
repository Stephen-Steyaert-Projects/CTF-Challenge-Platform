import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: "User" },
  challenge: { type: mongoose.ObjectId, ref: "Challenge" },
  submittedFlag: String,
  correct: Boolean,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
