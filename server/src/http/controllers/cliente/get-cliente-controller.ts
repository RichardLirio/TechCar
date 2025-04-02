import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetClienteUseCase } from "@/use-cases/factories/make-get-cliente-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetCliente(request: FastifyRequest, reply: FastifyReply) {
  const validateClienteParamsSchema = z.object({
    id: z.coerce.number(), // // Definindo o esquema para os parâmetros da requisição usando Zod
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateClienteParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const getClienteProfile = makeGetClienteUseCase(); // Criando uma instância do caso de uso de obtenção de perfil de cliente

    const { cliente } = await getClienteProfile.execute({
      // // Criando uma instância do caso de uso de obtenção de perfil de usuário e executando o método execute com os dados validados
      clienteId: id,
    });

    return reply.status(200).send({
      cliente, // // Enviando a resposta com os dados do cliente
    }); // // Envia uma resposta 200 OK com os dados do cliente
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
