import { makeGetAllUsersUseCase } from "@/use-cases/factories/make-get-todos-usuarios-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

/// Controller to handle fetching all users
export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllUsers = makeGetAllUsersUseCase(); // // Create an instance of the use case
  const { usuarios } = await getAllUsers.execute(); // // Execute the use case to get all users

  reply.status(200).send({
    usuarios: usuarios, // // Send a 200 OK response with the list of users
  });
}
