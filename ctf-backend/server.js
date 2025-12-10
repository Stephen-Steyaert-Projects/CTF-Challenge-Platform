import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.js";
import challengeRoutes from "./src/routes/challenges.js";
import submissionRoutes from "./src/routes/submissions.js";

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "CTF API Running" }));

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_PORT !== "test")
  app.listen(PORT, () => console.log("Server running on port " + PORT));

export default app;
