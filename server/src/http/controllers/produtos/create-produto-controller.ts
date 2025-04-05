import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateVeiculoUseCase } from "@/use-cases/factories/veiculos/make-create-veiculo-use-case";
import { VeiculoAlreadyExistsError } from "@/use-cases/erros/veiculo-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { ProdutoAlreadyExistsError } from "@/use-cases/erros/produto-ja-existe-erro";
import { makeCreateProdutoUseCase } from "@/use-cases/factories/produtos/make-create-produto-use-case";

// Controller to handle veiculo creation
export async function CreateProduto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createProdutoBodySchema = z.object({
    nome: z.string(),
    quantidade: z.number(),
    valorUnitario: z.number(),
  }); // // Define the schema for the request body using Zod

  const { nome, quantidade, valorUnitario } = createProdutoBodySchema.parse(
    request.body
  ); // // Parse and validate the request body against the schema

  try {
    const createProdutoUseCase = makeCreateProdutoUseCase(); // // Create an instance of the use case
    await createProdutoUseCase.execute({
      nome,
      quantidade,
      valorUnitario,
    }); // // Execute the use case with the parsed data
  } catch (error) {
    if (error instanceof ProdutoAlreadyExistsError) {
      // // Check if the error is an instance of ProdutoAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send(); // // Send a 201 Created response if the Produto is created successfully
}
