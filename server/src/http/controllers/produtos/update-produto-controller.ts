import { ProdutoAlreadyExistsError } from "@/use-cases/erros/produto-ja-existe-erro";
import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeUpdateProdutoUseCase } from "@/use-cases/factories/produtos/make-update-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/// Controller to handle user update
export async function UpdateProduto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createClientBodySchema = z.object({
    nome: z.string(),
    quantidade: z.number(),
    valorUnitario: z.number(),
  }); // // Define the schema for the request body using Zod

  const validateProdutoParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { nome, quantidade, valorUnitario } = createClientBodySchema.parse(
    request.body
  ); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  const { id } = validateProdutoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const updateProdutoUseCase = makeUpdateProdutoUseCase();
    const { produto } = await updateProdutoUseCase.execute({
      id,
      nome,
      quantidade,
      valorUnitario,
    }); // // Criando uma instância do caso de uso de atualização de produto e executando o método execute com os dados validados

    return reply.code(200).send({ produto }); // // Envia uma resposta 200 OK com os dados do produto atualizado
  } catch (error) {
    if (error instanceof ProdutoAlreadyExistsError) {
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
