import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateVeiculoUseCase } from "@/use-cases/factories/veiculos/make-create-veiculo-use-case";
import { VeiculoAlreadyExistsError } from "@/use-cases/erros/veiculo-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";

// Controller to handle veiculo creation
export async function CreateVeiculo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createVeiculoBodySchema = z.object({
    clienteId: z.number(),
    placa: z.string(),
    modelo: z.string(),
    marca: z.string(),
    ano: z.number().nullable(),
  }); // // Define the schema for the request body using Zod

  const { clienteId, placa, modelo, marca, ano } =
    createVeiculoBodySchema.parse(request.body); // // Parse and validate the request body against the schema

  try {
    const createVeiculoUseCase = makeCreateVeiculoUseCase(); // // Create an instance of the use case
    await createVeiculoUseCase.execute({
      clienteId,
      placa,
      modelo,
      marca,
      ano,
    }); // // Execute the use case with the parsed data
  } catch (error) {
    if (error instanceof VeiculoAlreadyExistsError) {
      // // Check if the error is an instance of VeiculoAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof ResourceNotFoundError) {
      // // Check if the error is an instance of ResourceNotFoundError
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send(); // // Send a 201 Created response if the veiculo is created successfully
}
