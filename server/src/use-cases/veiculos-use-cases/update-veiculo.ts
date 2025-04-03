import { Veiculo } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { VeiculoAlreadyExistsError } from "../erros/veiculo-ja-existe-erro";
import { formatarPlaca } from "@/value-object/PlacaVeiculos";

interface UpdateVeiculoUseCaseParams {
  veiculoId: number;
  clienteId: number;
  placa: string;
  modelo: string;
  marca: string;
  ano?: number | null;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface UpdateVeiculoUseCaseResponse {
  veiculo: Veiculo;
} // Cria uma interface para a resposta do caso de uso

export class UpdateVeiculoUseCase {
  constructor(
    private veiculoRepository: VeiculoRepository,
    private clienteRepository: ClienteRepository
  ) {}

  async execute({
    veiculoId,
    clienteId,
    placa,
    modelo,
    marca,
    ano,
  }: UpdateVeiculoUseCaseParams): Promise<UpdateVeiculoUseCaseResponse> {
    const placaFormatada = await formatarPlaca(placa);

    const veiculoExists = await this.veiculoRepository.findById(veiculoId); // Verifica se o veiculo existe

    if (!veiculoExists) {
      throw new ResourceNotFoundError(); // Lança um erro se o veiculo não for encontrado
    }

    const veiculoWithSamePlaca = await this.veiculoRepository.findByPlaca(
      placaFormatada
    ); // Verifica se já existe um cliente com o mesmo cnpj

    if (veiculoWithSamePlaca && veiculoWithSamePlaca.id != Number(veiculoId)) {
      throw new VeiculoAlreadyExistsError(); // Lança um erro se o veiculo já existir com essa placa em outro codigo
    }

    const clienteExiste = await this.clienteRepository.findById(clienteId); //procura pelo id informado do cliente se ele existe

    if (!clienteExiste) {
      throw new ResourceNotFoundError(); //retorna erro de recurso não encontrado
    }

    const veiculo = await this.veiculoRepository.update({
      id: veiculoId,
      clienteId,
      placa: placaFormatada,
      modelo,
      marca,
      ano,
    }); //atualiza o veiculo no repositório

    if (!veiculo) {
      throw new ResourceNotFoundError(); // Lança um erro se o veiculo não for encontrado
    }

    return { veiculo }; //Retorna o cliente atualizado
  }
}
