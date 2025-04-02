import { Veiculo } from "@prisma/client";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { formatarPlaca } from "@/value-object/PlacaVeiculos";
import { VeiculoAlreadyExistsError } from "../erros/veiculo-ja-existe-erro";

interface CreateVeiculoUseCaseParams {
  clienteId: number;
  placa: string;
  modelo: string;
  marca: string;
  ano?: number | null;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateVeiculoUseCaseResponse {
  veiculo: Veiculo;
} // Cria uma interface para a resposta do caso de uso

export class CreateVeiculoUseCase {
  constructor(private veiculoRepository: VeiculoRepository) {}

  async execute({
    clienteId,
    placa,
    modelo,
    marca,
    ano,
  }: CreateVeiculoUseCaseParams): Promise<CreateVeiculoUseCaseResponse> {
    const placaFormatada = await formatarPlaca(placa);

    const veiculoComMesmaPlaca = await this.veiculoRepository.findByPlaca(
      placaFormatada
    ); // Verifica se já existe um Veiculo com a mesma placa

    if (veiculoComMesmaPlaca) {
      throw new VeiculoAlreadyExistsError();
    } // Lança um erro se o Veiculo já existir

    const veiculo = await this.veiculoRepository.create({
      clienteId,
      placa: placaFormatada,
      marca,
      modelo,
      ano,
    }); // Cria um novo Veiculo no repositório

    return { veiculo }; // Retorna o Veiculo criado
  }
}
