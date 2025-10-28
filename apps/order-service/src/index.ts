import fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";

const app = fastify();
app.register(clerkPlugin)

app.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", {preHandler: userAuthMiddleware}, (request, reply) => {
  return reply.send({ message: "Order service authenticated!", userId: request.userId });
});
  

const start = async () => {
  try {
    await app.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
