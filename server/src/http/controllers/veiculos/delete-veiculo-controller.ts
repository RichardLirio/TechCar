import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteVeiculoUseCase } from "@/use-cases/factories/veiculos/make-delete-veiculo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle Veiculo deletion
export async function DeleteVeiculo(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteVeiculoParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = deleteVeiculoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const deleteVeiculoUseCase = makeDeleteVeiculoUseCase();

    await deleteVeiculoUseCase.execute({ veiculoId: id }); // Criando uma instância do caso de uso de deleção de veiculo e executando o método execute com os dados validados

    return reply.status(200).send({
      message: "Veiculo excluido com sucesso.", // // Envia uma resposta 200 OK se o usuário for excluído com sucesso
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
