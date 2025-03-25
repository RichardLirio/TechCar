import { FastifyInstance } from "fastify";
import { CreateUser } from "./controllers/user-create-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", CreateUser);
}
