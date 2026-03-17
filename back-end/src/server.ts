import "dotenv/config";

import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { profileRouter } from "./routes/profile";
import { planRouter } from "./routes/plan";

const app = express();
const port = process.env.PORT || 3000;



app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

// API Routes

app.use("/api/profile", (profileRouter));
app.use("/api/plan",planRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});