import { FastifyInstance } from "fastify";
import { CreateUser } from "./controllers/create-usuario-controller";

export async function appRoutes(app: FastifyInstance) {
  //criar novo usuario
  app.post("/users", CreateUser);

  //logar usuario
}
