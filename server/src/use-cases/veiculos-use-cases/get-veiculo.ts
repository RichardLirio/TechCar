import { Veiculo } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { VeiculoRepository } from "@/repositories/veiculo-repository";

interface GetVeiculoUseCaseParams {
  veiculoId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetClienteUseCaseResponse {
  veiculo: Veiculo;
} // Cria uma interface para a resposta do caso de uso

export class GetVeiculoUseCase {
  constructor(private veiculoRepository: VeiculoRepository) {}

  async execute({
    veiculoId,
  }: GetVeiculoUseCaseParams): Promise<GetClienteUseCaseResponse> {
    const veiculo = await this.veiculoRepository.findById(veiculoId); // Busca o cliente pelo ID no repositório

    if (!veiculo) {
      throw new ResourceNotFoundError(); // Lança um erro se o cliente não for encontrado
    }

    return { veiculo }; // Retorna o cliente encontrado
  }
}
