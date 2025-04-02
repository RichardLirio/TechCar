import { ClientAlreadyExistsError } from "@/use-cases/erros/cliente-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeUpdateClienteUseCase } from "@/use-cases/factories/clientes/make-update-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/// Controller to handle user update
export async function UpdateCliente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    nome: z.string(),
    cpfCnpj: z.string(),
    telefone: z.string().default(""),
    tipo: z.enum(["FISICA", "JURIDICA"]).default("FISICA"),
  }); // // Define the schema for the request body using Zod

  const validateClienteParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { nome, cpfCnpj, telefone, tipo } = createClientBodySchema.parse(
    request.body
  ); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  const { id } = validateClienteParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const updateClienteUseCase = makeUpdateClienteUseCase();
    const { cliente } = await updateClienteUseCase.execute({
      id,
      nome,
      cpfCnpj,
      telefone,
      tipo,
    }); // // Criando uma instância do caso de uso de atualização de cliente e executando o método execute com os dados validados

    return reply.code(200).send({ cliente }); // // Envia uma resposta 200 OK com os dados do cliente atualizado
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      // // Verifica se o erro é uma instância de UserAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof ResourceNotFoundError) {
      // // Verifica se o erro é uma instância de ResourceNotFoundError
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }
}
