import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { adminAuthMiddleware } from "./middleware/authMiddleware";
import { userRoute } from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 8003;

app.use(
  cors({
    origin: ["http://localhost:3003"],
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "production") console.error(err);
  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  return;
});

app.use("/users", adminAuthMiddleware, userRoute);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Auth service listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
