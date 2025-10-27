import fastify from "fastify";

const app = fastify();

app.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
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
