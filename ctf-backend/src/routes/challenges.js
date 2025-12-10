import express from "express";
import Challenge from "../models/Challenge.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const challenges = await Challenge.find({}, "-flag");
  res.json(challenges);
});

export default router;
