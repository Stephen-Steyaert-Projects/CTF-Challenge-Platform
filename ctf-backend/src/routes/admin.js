import express from "express"
import Challenge from "../models/Challenge.js"
import Submission from "../models/Submission.js"
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js"

const router = express.Router();

router.post("/challenges", auth, admin, async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res.json(challenge);
});

router.put("/challenges/:challengeId", auth, admin, async (req, res) => {
  const challenge = await Challenge.findByIdAndUpdate(req.params.challengeId, req.body, { new: true });
  res.json(challenge);
});

router.delete("/challenges/:challengeId", auth, admin, async (req, res) => {
  await Challenge.findByIdAndDelete(req.params.challengeId);
  res.json({ message: "Deleted" });
});

router.get("/submissions", auth, admin, async (req, res) => {
  const submissions = await Submission.find().populate("user").populate("challenge");
  res.json(submissions);
});

export default router;