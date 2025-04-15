import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ServicoAlreadyExistsError } from "@/use-cases/erros/servico-ja-existe-erro";
import { makeCreateServicoUseCase } from "@/use-cases/factories/servicos/make-create-servico-use-case";

// Controller to handle veiculo creation
export async function CreateServico(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createServicoBodySchema = z.object({
    descricao: z.string(),
    valorServico: z.number(),
  }); // // Define the schema for the request body using Zod

  const { descricao, valorServico } = createServicoBodySchema.parse(
    request.body
  ); // // Parse and validate the request body against the schema

  try {
    const createServicoUseCase = makeCreateServicoUseCase(); // // Create an instance of the use case
    await createServicoUseCase.execute({
      descricao,
      valorServico,
    }); // // Execute the use case with the parsed data
  } catch (error) {
    if (error instanceof ServicoAlreadyExistsError) {
      // // Check if the error is an instance of ServicoAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send(); // // Send a 201 Created response if the Servico is created successfully
}
