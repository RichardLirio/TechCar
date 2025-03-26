import { FastifyInstance } from "fastify";
import { CreateUser } from "./create-usuario-controller";
import { AuthenticateUsuario } from "./authenticate-usuario.controller";
import { refresh } from "./refreshToken";

export async function appRoutes(app: FastifyInstance) {
  //criar novo usuario
  app.post("/users", CreateUser);

  //logar usuario
  app.post("/sessions", AuthenticateUsuario);

  //token refresh
  app.patch("/token/refresh", refresh);
}
