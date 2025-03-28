import { makeGetAllUsersUseCase } from "@/use-cases/factories/make-get-todos-usuarios-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllUsers = makeGetAllUsersUseCase();
  const { usuarios } = await getAllUsers.execute();

  reply.status(200).send({
    usuarios: usuarios,
  });
}
