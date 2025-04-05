import { makeGetAllProdutosUseCase } from "@/use-cases/factories/produtos/make-get-todos-produtos-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

/// Controller to handle fetching all clientes
export async function GetAllProdutos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getAllProdutos = makeGetAllProdutosUseCase(); // // Create an instance of the use case
  const { produtos } = await getAllProdutos.execute(); // // Execute the use case to get all produtos

  reply.status(200).send({
    produtos: produtos, // // // Send a 200 OK response with the list of produtos
  });
}
