import { makeGetAllServicosUseCase } from "@/use-cases/factories/servicos/make-get-todos-servicos-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

/// Controller to handle fetching all clientes
export async function GetAllServicos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllServicos = makeGetAllServicosUseCase(); // // Create an instance of the use case
  const { servicos } = await getAllServicos.execute(); // // Execute the use case to get all servicos

  reply.status(200).send({
    servicos: servicos, // // // Send a 200 OK response with the list of servicos
  });
}
