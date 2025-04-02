import { makeGetAllClientesUseCase } from "@/use-cases/factories/clientes/make-get-todos-clientes-use-case";
import { makeGetAllVeiculosUseCase } from "@/use-cases/factories/veiculos/make-get-todos-veiculos-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

/// Controller to handle fetching all veiculos
export async function getAllveiculos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllveiculos = makeGetAllVeiculosUseCase(); // // Create an instance of the use case
  const { veiculos } = await getAllveiculos.execute(); // // Execute the use case to get all users

  reply.status(200).send({
    veiculos: veiculos, // // Send a 200 OK response with the list of users
  });
}
