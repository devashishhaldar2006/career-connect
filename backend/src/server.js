import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

const __dirname = path.resolve();

// middlewares
app.use(express.json());
// credentials true meaning?? =>server allow browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(clerkMiddleware()); //this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat",chatRoutes)

app.get("/health", (req, res) => {
  req.auth();
  res.status(200).json({ msg: "Success from api" });
});

// when you pass an array of middleware to Express, it automatically flattens and executes them sequentially, one by one

//make our app ready for development
if (ENV.NODE_ENV === "production") {
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
