import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreateProduto } from "./create-produto-controller";

export async function produtoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/produto", CreateProduto); // endpoint de criação de produto
}
