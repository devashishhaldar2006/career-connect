import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
const app = express();

const __dirname = path.resolve();
const port = process.env.PORT || 3000;
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Success from api" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the books endpoint" });
});

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
    console.error("💥Error starting the server:",error);
  }
};
startServer();
