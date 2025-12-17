import express from "express";
import { ENV } from "./lib/env.js";
const app = express();

const port=process.env.PORT||3000;
app.
  get("/", (req, res) => {
    res.status(200).json({ msg: "Success from api" });
  });
app.listen(ENV.PORT, () => console.log(`server is running on port: ${ENV.PORT}`));
