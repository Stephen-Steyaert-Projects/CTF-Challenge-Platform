import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const user = await User.create({ username, password, isAdmin: !!isAdmin });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });

    res.status(201).json({ username: user.username, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });

    res.status(200).json({ username: user.username, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout
router.post("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username isAdmin");
    res.json(user);
  } catch {
    res.json(null);
  }
});

export default router;
