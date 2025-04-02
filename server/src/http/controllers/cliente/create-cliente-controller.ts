import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ClientAlreadyExistsError } from "@/use-cases/erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "@/use-cases/erros/cpfCnpj-invalido";
import { makeCreateClientUseCase } from "@/use-cases/factories/clientes/make-create-client-use-case";

// Controller to handle client creation
export async function CreateClient(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    nome: z.string(),
    cpfCnpj: z.string(),
    telefone: z.string().default(""),
    tipo: z.enum(["FISICA", "JURIDICA"]).default("FISICA"),
  }); // // Define the schema for the request body using Zod

  const { nome, cpfCnpj, telefone, tipo } = createClientBodySchema.parse(
    request.body
  ); // // Parse and validate the request body against the schema

  try {
    const createClientUseCase = makeCreateClientUseCase(); // // Create an instance of the use case
    await createClientUseCase.execute({ nome, cpfCnpj, telefone, tipo }); // // Execute the use case with the parsed data
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      // // Check if the error is an instance of ClientAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof CpfCnpjInvalidError) {
      // // Check if the error is an instance of CpfCnpjInvalidError
      return reply.status(409).send({
        message: error.message,
      });
    }
    //CpfCnpjInvalidError

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send(); // // Send a 201 Created response if the client is created successfully
}
