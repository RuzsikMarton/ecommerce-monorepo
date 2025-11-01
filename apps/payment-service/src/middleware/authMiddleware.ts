import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { CustomJwtSessionClaims } from "@repo/types";

export const userAuthMiddleware = createMiddleware<{
  Variables: { userId: string };
}>(async (c: any, next: any) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  c.set("userId", auth.userId);

  await next();
});

export const adminAuthMiddleware = createMiddleware<{
  Variables: { userId: string };
}>(async (c: any, next: any) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "Unauthorized!" });
  }

  c.set("userId", auth.userId);

  await next();
});
