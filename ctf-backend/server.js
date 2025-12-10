import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

dotenv.config(); // load .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import challengeRoutes from "./routes/challenge.js";
import submissionRoutes from "./routes/submission.js";

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/challenges", challengeRoutes);
app.use("/submissions", submissionRoutes);

// DO NOT connect DB if testing
if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export default app; // supertest needs this
