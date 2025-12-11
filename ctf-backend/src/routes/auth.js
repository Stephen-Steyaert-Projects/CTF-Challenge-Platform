import express from "express";
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
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "User registered",
      id: user._id,
      username: user.username,
    });
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
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", auth, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

router.get("/me", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("username isAdmin");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.json(null);
  }
});


export default router;
