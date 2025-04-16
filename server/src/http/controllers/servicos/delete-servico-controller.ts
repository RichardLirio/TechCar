import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteServicoUseCase } from "@/use-cases/factories/servicos/make-delete-servico-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle Servico deletion
export async function DeleteServico(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteServicoParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = deleteServicoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const deleteServicoUseCase = makeDeleteServicoUseCase();

    await deleteServicoUseCase.execute({ servicoId: id }); // Criando uma instância do caso de uso de deleção de Servico e executando o método execute com os dados validados

    return reply.status(200).send({
      message: "Servico excluido com sucesso.", // // Envia uma resposta 200 OK se o servico for excluído com sucesso
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
