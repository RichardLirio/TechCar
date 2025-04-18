import { ServicoAlreadyExistsError } from "@/use-cases/erros/servico-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateServicoUseCase } from "@/use-cases/factories/servicos/make-update-servico-use-case";

/// Controller to handle user update
export async function UpdateServico(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    descricao: z.string(),
    valorServico: z.number(),
  }); // // Define the schema for the request body using Zod

  const validateServicoParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { descricao, valorServico } = createClientBodySchema.parse(
    request.body
  ); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  const { id } = validateServicoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const updateServicoUseCase = makeUpdateServicoUseCase();
    const { servico } = await updateServicoUseCase.execute({
      id,
      descricao,
      valorServico,
    }); // // Criando uma instância do caso de uso de atualização de servico e executando o método execute com os dados validados

    return reply.code(200).send({ servico }); // // Envia uma resposta 200 OK com os dados do servico atualizado
  } catch (error) {
    if (error instanceof ServicoAlreadyExistsError) {
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
