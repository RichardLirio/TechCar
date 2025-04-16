import { Veiculo } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteVeiculoUseCaseParams {
  veiculoId: number;
}

interface DeleteVeiculoUseCaseResponse {
  veiculo: Veiculo;
} // Cria uma interface para a resposta do caso de uso

export class DeleteVeiculoUseCase {
  constructor(private veiculoRepository: VeiculoRepository) {}

  async execute({
    veiculoId,
  }: DeleteVeiculoUseCaseParams): Promise<DeleteVeiculoUseCaseResponse> {
    // Verifica se o veiculoId é válido
    const veiculoExists = await this.veiculoRepository.findById(veiculoId);

    // Se o veiculo não existir, lança um erro
    if (veiculoExists === null) {
      throw new ResourceNotFoundError();
    }

    // Verifica se o veiculo existe
    const veiculo = await this.veiculoRepository.deleteById(veiculoId);

    return { veiculo }; // Retorna o veiculo excluído
  }
}
