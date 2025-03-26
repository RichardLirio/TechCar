import { FastifyInstance } from "fastify";
import { CreateUser } from "./create-usuario-controller";
import { AuthenticateUsuario } from "./authenticate-usuario.controller";

export async function appRoutes(app: FastifyInstance) {
  //criar novo usuario
  app.post("/users", CreateUser);

  //logar usuario
  app.post("/sessions", AuthenticateUsuario);
}
