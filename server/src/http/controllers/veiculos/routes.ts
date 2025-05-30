import { FastifyInstance } from "fastify";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { CreateVeiculo } from "./create-veiculo-controller";
import { GetVeiculo } from "./get-veiculo-controller";
import { getAllveiculos } from "./get-todos-veiculos-controller";
import { DeleteVeiculo } from "./delete-veiculo-controller";
import { Updateveiculo } from "./update-veiculo-controller";

export async function veiculoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT); // middleware para verificar o JWT

  app.post("/veiculo", CreateVeiculo); // endpoint de criação de veiculo

  app.get("/veiculo/:id", GetVeiculo); // endpoint para obter veiculo por ID

  app.get("/veiculos", getAllveiculos); // endpoint para obter todos os veiculos

  app.delete("/veiculo/:id", DeleteVeiculo); //endpoint para deletar veiculo

  app.patch("/veiculo/:id", Updateveiculo); //endpoint para atualizar veiculo
}
