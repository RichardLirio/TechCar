import { FastifyInstance } from "fastify";
import { CreateUser } from "./controllers/create-usuario-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", CreateUser);
}
