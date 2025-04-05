import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteProdutoUseCase } from "@/use-cases/factories/produtos/make-delete-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle Produto deletion
export async function DeleteProduto(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteProdutoParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = deleteProdutoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const deleteProdutoUseCase = makeDeleteProdutoUseCase();

    await deleteProdutoUseCase.execute({ produtoId: id }); // Criando uma instância do caso de uso de deleção de Produto e executando o método execute com os dados validados

    return reply.status(200).send({
      message: "Produto excluido com sucesso.", // // Envia uma resposta 200 OK se o produto for excluído com sucesso
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      // // Verifica se o erro é uma instância de ResourceNotFoundError
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send();
  }
}
