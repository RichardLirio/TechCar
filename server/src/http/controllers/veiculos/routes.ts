import { FastifyInstance } from "fastify";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { CreateVeiculo } from "./create-veiculo-controller";

export async function veiculoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/veiculo", CreateVeiculo); // endpoint de criação de veiculo

  //   app.get("/veiculo/:id", Getveiculo); // endpoint para obter veiculo por ID

  //   app.get("/veiculos", getAllveiculos); // endpoint para obter todos os veiculos

  //   app.delete("/veiculo/:id", Deleteveiculo);

  //   app.patch("/veiculo/:id", Updateveiculo);
}
