import { FastifyInstance } from "fastify";
import { CreateUser } from "./create-usuario-controller";
import { AuthenticateUsuario } from "./authenticate-usuario-controller";
import { refresh } from "./refreshToken";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { getUserProfile } from "./get-usuario-profile-controller";
import { VerifyUserRole } from "@/http/middlewares/verify-user-role";
import { getAllUsers } from "./get-todos-usuarios-controller";

export async function usuarioRoutes(app: FastifyInstance) {
  //logar usuario
  app.post("/sessions", AuthenticateUsuario);

  //token refresh
  app.patch("/token/refresh", refresh);

  /**Rotas Autenticadas */
  //busca dados de um usuario
  app.get(
    "/user/:id",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    getUserProfile
  );

  app.get(
    "/users",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    getAllUsers
  );

  //criar novo usuario
  app.post(
    "/users",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    CreateUser
  );
}
