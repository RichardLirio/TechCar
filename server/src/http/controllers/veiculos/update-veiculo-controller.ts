import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { VeiculoAlreadyExistsError } from "@/use-cases/erros/veiculo-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeUpdateVeiculoUseCase } from "@/use-cases/factories/veiculos/make-update-veiculo-use-case";

// Controller to handle veiculo update
export async function Updateveiculo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateVeiculoBodySchema = z.object({
    clienteId: z.number(),
    placa: z.string(),
    modelo: z.string(),
    marca: z.string(),
    ano: z.number().nullable(),
  }); // // Define the schema for the request body using Zod

  const { clienteId, placa, modelo, marca, ano } =
    updateVeiculoBodySchema.parse(request.body); // // Parse and validate the request body against the schema

  const validateVeiculoParamsSchema = z.object({
    id: z.coerce.number(), // // Definindo o esquema para os parâmetros da requisição usando Zod
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateVeiculoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const updateVeiculoUseCase = makeUpdateVeiculoUseCase(); // // Create an instance of the use case
    const { veiculo } = await updateVeiculoUseCase.execute({
      veiculoId: id,
      clienteId,
      placa,
      modelo,
      marca,
      ano,
    }); // // Execute the use case with the parsed data

    return reply.status(200).send({ veiculo }); // // Send a 200 Created response if the veiculo is update successfully
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
}
