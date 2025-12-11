import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";

dotenv.config(); // load .env

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // handle preflight

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
import authRoutes from "./src/routes/auth.js";
import adminRoutes from "./src/routes/admin.js";
import challengeRoutes from "./src/routes/challenges.js";
import submissionRoutes from "./src/routes/submissions.js";

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/challenges", challengeRoutes);
app.use("/submissions", submissionRoutes);

// DO NOT connect DB if testing
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      const PORT = 5000;
      app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default app; // supertest needs this
