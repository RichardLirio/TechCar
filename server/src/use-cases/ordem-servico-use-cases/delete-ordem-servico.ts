import { OrdemServico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteOrdemServicoUseCaseParams {
  ordemServicoId: number;
}

interface DeleteOrdemServicoUseCaseResponse {
  ordemServico: OrdemServico;
} // Cria uma interface para a resposta do caso de uso

export class DeleteOrdemServicoUseCase {
  constructor(private ordemServicoRepository: OrdemServicoRepository) {}

  async execute({
    ordemServicoId,
  }: DeleteOrdemServicoUseCaseParams): Promise<DeleteOrdemServicoUseCaseResponse> {
    const ordemServicoExist = await this.ordemServicoRepository.findById(
      ordemServicoId
    ); // Verifica se a ordemservicoId é válido

    if (!ordemServicoExist) {
      throw new ResourceNotFoundError(); // Se a ordemservico não existir, lança um erro
    }
    // Verifica se o ordemservico existe
    const ordemServico = await this.ordemServicoRepository.deleteById(
      ordemServicoId
    );
    // Se o ordemservico não existir, lança um erro

    return { ordemServico }; // Retorna o ordemServico excluído
  }
}
