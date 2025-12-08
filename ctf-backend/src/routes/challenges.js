import express from "express";
import Challenge from "../models/Challenge.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// Public – list challenges
router.get("/", async (req, res) => {
  const challenges = await Challenge.find({}, "-flag");
  res.json(challenges);
});

// Admin CRUD
router.post("/", auth, admin, async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res.json(challenge);
});

router.put("/:id", auth, admin, async (req, res) => {
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(challenge);
});

router.delete("/:id", auth, admin, async (req, res) => {
  await Challenge.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
