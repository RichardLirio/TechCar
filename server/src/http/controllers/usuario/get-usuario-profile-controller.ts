import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetUsuarioUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

// Controller to handle fetching a user profile
export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateUserParamsSchema = z.object({
    id: z.string().uuid(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateUserParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const getUserProfile = makeGetUsuarioUseCase(); // // Criando uma instância do caso de uso de obtenção de perfil de usuário

    const { usuario } = await getUserProfile.execute({
      // // Criando uma instância do caso de uso de obtenção de perfil de usuário e executando o método execute com os dados validados
      userId: id,
    });

    return reply.status(200).send({
      user: {
        ...usuario,
        password_hash: undefined,
      },
    }); // // Envia uma resposta 200 OK com os dados do usuário, excluindo o hash da senha
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      // // // Verifica se o erro é uma instância de ResourceNotFoundError
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }
}
