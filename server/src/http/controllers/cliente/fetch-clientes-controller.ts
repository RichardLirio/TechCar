import { makeGetAllClientesUseCase } from "@/use-cases/factories/clientes/make-get-todos-clientes-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

/// Controller to handle fetching all clientes
export async function getAllClientes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllClientes = makeGetAllClientesUseCase(); // // Create an instance of the use case
  const { clientes } = await getAllClientes.execute(); // // Execute the use case to get all users

  reply.status(200).send({
    clientes: clientes, // // Send a 200 OK response with the list of users
  });
}
