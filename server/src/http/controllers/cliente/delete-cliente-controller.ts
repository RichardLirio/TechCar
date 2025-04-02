import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteClientUseCase } from "@/use-cases/factories/clientes/make-delete-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle cliente deletion
export async function DeleteCliente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const deleteClienteParamsSchema = z.object({
    id: z.coerce.number(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = deleteClienteParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const deleteClienteUseCase = makeDeleteClientUseCase();

    await deleteClienteUseCase.execute({ clienteId: id }); // Criando uma instância do caso de uso de deleção de cliente e executando o método execute com os dados validados

    return reply.status(200).send({
      message: "Cliente excluido com sucesso.", // // Envia uma resposta 200 OK se o usuário for excluído com sucesso
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
