import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import sessionRoutes from "./routes/sessionRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const __dirname = path.resolve();

// middlewares
app.use(express.json());
// Allow single or multiple origins (comma-separated or single URL)
const allowedOrigins = ENV.CLIENT_URL ? ENV.CLIENT_URL.split(",").map((url) => url.trim()) : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, uptime bots)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Lightweight Health-Check endpoint for Render / Uptime monitors
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(clerkMiddleware()); //this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Optional static serve if running in monolithic mode
if (ENV.NODE_ENV === "production" && process.env.SERVE_FRONTEND === "true") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("💥Error starting the server:", error);
  }
};
startServer();
