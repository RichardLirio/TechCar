import { FastifyInstance } from "fastify";
import { CreateClient } from "./create-cliente-controller";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";

export async function clientRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/cliente", CreateClient); // endpoint de criação de cliente
}
