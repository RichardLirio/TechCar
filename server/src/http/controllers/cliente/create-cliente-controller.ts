import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ClientAlreadyExistsError } from "@/use-cases/erros/cliente-ja-existe-erro";
import { makeCreateClientUseCase } from "@/use-cases/factories/make-create-client-use-case";
import { CpfCnpjInvalidError } from "@/use-cases/erros/cpfCnpj-invalido";

export async function CreateClient(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    nome: z.string(),
    cpfCnpj: z.string(),
    telefone: z.string().default(""),
    tipo: z.enum(["FISICA", "JURIDICA"]).default("FISICA"),
  });

  const { nome, cpfCnpj, telefone, tipo } = createClientBodySchema.parse(
    request.body
  );

  try {
    const createClientUseCase = makeCreateClientUseCase();
    await createClientUseCase.execute({ nome, cpfCnpj, telefone, tipo });
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof CpfCnpjInvalidError) {
      return reply.status(409).send({
        message: error.message,
      });
    }
    //CpfCnpjInvalidError

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send();
}
