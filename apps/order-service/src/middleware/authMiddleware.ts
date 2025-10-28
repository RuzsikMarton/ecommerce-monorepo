import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        userId?: string;
    }
}

export const userAuthMiddleware = async (request : FastifyRequest, reply : FastifyReply) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return reply
      .status(401)
      .send({ message: "Unauthorized, you are not logged in." });
  }

  request.userId = userId;
};
