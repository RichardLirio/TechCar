import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreateProduto } from "./create-produto-controller";
import { DeleteProduto } from "./delete-produto-controller";
import { GetAllProdutos } from "./get-todos-produtos-controller";
import { GetProduto } from "./get-produto-controller";
import { UpdateProduto } from "./update-produto-controller";

export async function produtoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/produto", CreateProduto); // endpoint de criação de produto

  app.delete("/produto/:id", DeleteProduto); //delete produto pelo id

  app.get("/produtos", GetAllProdutos); // endpoint para buscar todos os produtos

  app.get("/produto/:id", GetProduto); // endpoint para buscar produto por id

  app.patch("/produto/:id", UpdateProduto); // endpoint para atualizar produto por id
}
