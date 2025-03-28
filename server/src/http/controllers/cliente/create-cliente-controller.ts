import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ClientAlreadyExistsError } from "@/use-cases/erros/cliente-ja-existe-erro";
import { makeCreateClientUseCase } from "@/use-cases/factories/make-create-client-use-case";
import { isValidCPF } from "@/utils/verify-cpf";

export async function CreateClient(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    nome: z.string(),
    cpfCnpj: z.string(),
    telefone: z.string().default(""),
  });

  const { nome, cpfCnpj, telefone } = createClientBodySchema.parse(
    request.body
  );

  try {
    const cpfCnpjIsValid = await isValidCPF(cpfCnpj);

    const createClientUseCase = makeCreateClientUseCase();
    await createClientUseCase.execute({ nome, cpfCnpj, telefone });
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send();
}
