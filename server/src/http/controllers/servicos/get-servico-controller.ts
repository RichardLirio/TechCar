import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetServicoUseCase } from "@/use-cases/factories/servicos/make-get-servico-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetServico(request: FastifyRequest, reply: FastifyReply) {
  const validateServicoParamsSchema = z.object({
    id: z.coerce.number(), // // Definindo o esquema para os parâmetros da requisição usando Zod
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateServicoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const getServicoProfile = makeGetServicoUseCase(); // Criando uma instância do caso de uso de obtenção de perfil de servico

    const { servico } = await getServicoProfile.execute({
      // // Criando uma instância do caso de uso de obtenção de perfil de usuário e executando o método execute com os dados validados
      servicoId: id,
    });

    return reply.status(200).send({
      servico, // // Enviando a resposta com os dados do servico
    }); // // Envia uma resposta 200 OK com os dados do servico
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
