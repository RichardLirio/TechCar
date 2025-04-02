import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { Veiculo } from "@prisma/client";

interface GetVeiculoUseCaseResponse {
  veiculos: Veiculo[];
} // Cria uma interface para a resposta do caso de uso

export class GetAllVeiculosUseCase {
  constructor(private veiculoRepository: VeiculoRepository) {}

  async execute(): Promise<GetVeiculoUseCaseResponse> {
    const veiculos = await this.veiculoRepository.findMany(); // Busca todos os veiculos no repositório

    return { veiculos }; //  Retorna a lista de veiculos encontrados
  }
}
