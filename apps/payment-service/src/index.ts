import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhooks.route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const app = new Hono();
app.use("*", clerkMiddleware());
app.use(
  "*",
  cors({ origin: [process.env.CLIENT_URL || "http://localhost:3002"] })
);

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", userAuthMiddleware, (c) => {
  return c.json({
    message: "Payment service authenticated!",
    userId: c.get("userId"),
  });
});

app.route("/session", sessionRoute);
app.route("/webhooks", webhookRoute);

const start = async () => {
  try {
    await Promise.all([producer.connect(), consumer.connect()]);
    await runKafkaSubscriptions();
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(
          `Payment servive is running on http://localhost:${info.port}`
        );
      }
    );
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};
start();
