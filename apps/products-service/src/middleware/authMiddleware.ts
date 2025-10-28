import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized, you are not logged in." });
  }

  req.userId = userId;
  return next();
};
