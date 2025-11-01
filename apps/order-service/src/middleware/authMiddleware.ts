import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { CustomJwtSessionClaims } from "@repo/types";

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

export const adminAuthMiddleware = async (request : FastifyRequest, reply : FastifyReply) => {
  const auth = getAuth(request);
  if (!auth.userId) {
    return reply
      .status(401)
      .send({ message: "Unauthorized, you are not logged in." });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;
  console.log('Admin Auth Claims:', claims);

  if(claims.metadata?.role !== 'admin') {
    return reply
      .status(403)
      .send({ message: "Unauthorized!" });
  }

  request.userId = auth.userId;
};
