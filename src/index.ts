import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import register from "./routes/register";
import login from "./routes/login";

import createCommunity from "./routes/community/create";
import addUser from "./routes/community/add";
import getCommunityInfo from "./routes/community/info";
import getUserInfo from "./routes/userinfo";
import createEvent from "./routes/event/create";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/register", register);
app.post("/login", login);

app.post("/community/create", createCommunity);
app.patch("/community/add", addUser);
app.get("/community/info", getCommunityInfo);
app.get("/userinfo", getUserInfo);
app.post("/event/create", createEvent);

app.listen(Number(port), "0.0.0.0", () => {
  if (process.env.MONGO_URI !== null && process.env.MONGO_URI !== undefined) {
    try {
      mongoose.connect(process.env.MONGO_URI);
    } catch {
      console.log("Error connecting to the database");
      process.exit(1);
    }
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } else {
    console.log("MONGO_URI is not defined in .env file. Exiting...");
    process.exit(1);
  }
});
