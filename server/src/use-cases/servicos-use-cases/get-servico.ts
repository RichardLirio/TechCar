import { Servico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ServicoRepository } from "@/repositories/servico-repository";

interface GetServicoUseCaseParams {
  servicoId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetClienteUseCaseResponse {
  servico: Servico;
} // Cria uma interface para a resposta do caso de uso

export class GetServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute({
    servicoId,
  }: GetServicoUseCaseParams): Promise<GetClienteUseCaseResponse> {
    const servico = await this.servicoRepository.findById(servicoId); // Busca o cliente pelo ID no repositório

    if (!servico) {
      throw new ResourceNotFoundError(); // Lança um erro se o cliente não for encontrado
    }

    return { servico }; // Retorna o cliente encontrado
  }
}
