import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetProdutoUseCase } from "@/use-cases/factories/produtos/make-get-produto-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetProduto(request: FastifyRequest, reply: FastifyReply) {
  const validateProdutoParamsSchema = z.object({
    id: z.coerce.number(), // // Definindo o esquema para os parâmetros da requisição usando Zod
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateProdutoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const getProdutoProfile = makeGetProdutoUseCase(); // Criando uma instância do caso de uso de obtenção de perfil de produto

    const { produto } = await getProdutoProfile.execute({
      // // Criando uma instância do caso de uso de obtenção de perfil de usuário e executando o método execute com os dados validados
      produtoId: id,
    });

    return reply.status(200).send({
      produto, // // Enviando a resposta com os dados do produto
    }); // // Envia uma resposta 200 OK com os dados do produto
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
