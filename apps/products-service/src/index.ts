import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});


app.get("/test", userAuthMiddleware , (req: Request, res: Response) => {
  res.json({ message: "Products service authenticated!", userId: req.userId });
});

app.listen(PORT, () => {
  console.log(`Products service is running on port ${PORT}`);
});
