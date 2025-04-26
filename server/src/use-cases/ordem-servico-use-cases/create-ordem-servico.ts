import { OrdemServico } from "@prisma/client";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { VeiculoEClienteError } from "../erros/veiculo-cliente-erro";

interface CreateOrdemServicoUseCaseParams {
  clienteId: number;
  veiculoId: number;
  km: number;
  desconto?: number;
  valorTotal?: number;
  status?: "ABERTA" | "FECHADA";
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateOrdemServicoUseCaseResponse {
  ordemServico: OrdemServico;
} // Cria uma interface para a resposta do caso de uso

export class CreateOrdemServicoUseCase {
  constructor(
    private servicoRepository: OrdemServicoRepository,
    private clientRepository: ClienteRepository,
    private veiculoRepository: VeiculoRepository
  ) {}

  async execute({
    clienteId,
    veiculoId,
    km,
    status,
    valorTotal,
    desconto,
  }: CreateOrdemServicoUseCaseParams): Promise<CreateOrdemServicoUseCaseResponse> {
    //caso de uso de criação de uma nova ordem de serviço
    //realizar o crud da ordem de serviço separado do item de serviço e produto

    const cliente = await this.clientRepository.findById(clienteId); // Busca o cliente pelo ID
    if (!cliente) {
      throw new ResourceNotFoundError(); // Lança um erro se o cliente não for encontrado
    }

    const veiculo = await this.veiculoRepository.findById(veiculoId); // Busca o veículo pelo ID
    if (!veiculo) {
      throw new ResourceNotFoundError(); // Lança um erro se o veículo não for encontrado
    }

    // Verifica se o veículo pertence ao cliente
    if (veiculo.clienteId !== clienteId) {
      throw new VeiculoEClienteError(); // Lança um erro se o veículo não pertencer ao cliente
    }

    const ordemServico = await this.servicoRepository.create({
      clienteId,
      veiculoId,
      km,
      status,
      valorTotal,
      desconto,
    }); // Cria uma nova ordem de serviço no repositório

    return { ordemServico }; // Retorna a ordem de serviço criada
  }
}
