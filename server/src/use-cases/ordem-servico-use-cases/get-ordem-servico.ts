import { OrdemServico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";

interface GetOrdemServicoCaseParams {
  ordemservicoId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetOrdemServicoCaseResponse {
  ordemservico: OrdemServico;
} // Cria uma interface para a resposta do caso de uso

export class GetOrdemServicoUseCase {
  constructor(private ordemservicoRepository: OrdemServicoRepository) {}

  async execute({
    ordemservicoId,
  }: GetOrdemServicoCaseParams): Promise<GetOrdemServicoCaseResponse> {
    const ordemservico = await this.ordemservicoRepository.findById(ordemservicoId); // Busca o usuário pelo ID no repositório

    if (!ordemservico) {
      throw new ResourceNotFoundError(); // Lança um erro se o usuário não for encontrado
    }

    return { ordemservico }; // Retorna o usuário encontrado
  }
}
