import { FastifyInstance } from "fastify";
import { CreateUser } from "./create-usuario-controller";
import { AuthenticateUsuario } from "./authenticate-usuario-controller";
import { refresh } from "./refreshToken";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { getUserProfile } from "./get-usuario-profile-controller";
import { VerifyUserRole } from "@/http/middlewares/verify-user-role";
import { getAllUsers } from "./fetch-usuarios-controller";
import { DeleteUser } from "./delete-usuario-controller";
import { UpdateUser } from "./update-usuario-controller";

export async function usuarioRoutes(app: FastifyInstance) {
  //middleware para verificar o JWT
  app.post("/sessions", AuthenticateUsuario);

  //middleware para verificar o JWT
  app.patch("/token/refresh", refresh);

  /**Rotas Autenticadas */
  //busca um usuario pelo id
  app.get(
    "/user/:id",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    getUserProfile
  );

  //busca todos os usuarios
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

  //Deleta um usuario
  app.delete(
    "/user/:id",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    DeleteUser
  );

  //Deleta um usuario
  app.patch(
    "/user/:id",
    { onRequest: [VerifyJWT, VerifyUserRole("ADMIN")] },
    UpdateUser
  );
}
