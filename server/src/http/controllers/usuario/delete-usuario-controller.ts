import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteUsuarioUseCase } from "@/use-cases/factories/make-delete-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle user deletion
export async function DeleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.string().uuid(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = deleteUserParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const deleteUserUseCase = makeDeleteUsuarioUseCase();

    await deleteUserUseCase.execute({ userId: id }); // Criando uma instância do caso de uso de deleção de usuário e executando o método execute com os dados validados

    return reply.status(200).send({
      message: "Usuario excluido com sucesso.", // // Envia uma resposta 200 OK se o usuário for excluído com sucesso
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
