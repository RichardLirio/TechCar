import { FastifyInstance } from "fastify";
import { CreateClient } from "./create-cliente-controller";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";

export async function clientRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);

  //create new client
  app.post("/cliente", CreateClient);
}
