import express from "express";
import Submission from "../models/Submission.js";
import Challenge from "../models/Challenge.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:challengeId", auth, async (req, res) => {
  const challenge = await Challenge.findById(req.params.challengeId);
  if (!challenge) return res.status(404).json({ error: "Not found" });

  const correct = req.body.flag === challenge.flag;

  const submission = await Submission.create({
    user: req.user.id,
    challenge: challenge._id,
    submittedFlag: req.body.flag,
    correct
  });

  res.json({ correct });
});

// Admin – view submissions
router.get("/", auth, async (req, res) => {
  const submissions = await Submission.find().populate("user").populate("challenge");
  res.json(submissions);
});

export default router;
