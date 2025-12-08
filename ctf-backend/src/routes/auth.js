import express from "express";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.json({
    id: user._id,
    username: user.username,
    token: generateToken(user)
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ error: "Invalid credentials" });

  res.json({
    id: user._id,
    username: user.username,
    token: generateToken(user)
  });
});

export default router;
