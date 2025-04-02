import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetClienteUseCase } from "@/use-cases/factories/clientes/make-get-cliente-use-case";
import { makeGetVeiculoUseCase } from "@/use-cases/factories/veiculos/make-get-veiculo-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetVeiculo(request: FastifyRequest, reply: FastifyReply) {
  const validateVeiculoParamsSchema = z.object({
    id: z.coerce.number(), // // Definindo o esquema para os parâmetros da requisição usando Zod
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { id } = validateVeiculoParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const getVeiculoUseCase = makeGetVeiculoUseCase(); // Criando uma instância do caso de uso de obtenção do veiculo

    const { veiculo } = await getVeiculoUseCase.execute({
      // // Criando uma instância do caso de uso de obtenção um veiculo e executando o método execute com os dados validados
      veiculoId: id,
    });

    return reply.status(200).send({
      veiculo, // // Enviando a resposta com os dados do veiculo
    }); // // Envia uma resposta 200 OK com os dados do veiculo
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
