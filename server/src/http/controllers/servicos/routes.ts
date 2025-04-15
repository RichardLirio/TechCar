import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreateServico } from "./create-servico-controller";

export async function servicoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/servico", CreateServico); // endpoint de criação de servico

  //app.delete("/servico/:id", DeleteServico); //delete servico pelo id

  //app.get("/servicos", GetAllServicos); // endpoint para buscar todos os servicos
}
