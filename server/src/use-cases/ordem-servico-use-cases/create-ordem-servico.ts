import { OrdemItemServico, OrdemServico } from "@prisma/client";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { CreateOrdemItemProdutoUseCaseParams } from "../ordem-item-produtos-use-cases/create-ordem-item-produto";

interface CreateOrdemServicoUseCaseParams {
  clienteId: number;
  veiculoId: number;
  km: number;
  mecanicoId?: number;
  desconto: number;
  valorTotal: number;
  pecasUsadas: CreateOrdemItemProdutoUseCaseParams[]; // Relação com produtos usadas
  servicos: OrdemItemServico[];
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateOrdemServicoUseCaseResponse {
  servico: OrdemServico;
} // Cria uma interface para a resposta do caso de uso

export class CreateOrdemServicoUseCase {
  constructor(private servicoRepository: OrdemServicoRepository) {}

  async execute({
    clienteId,
    veiculoId,
    km,
    mecanicoId,
    desconto,
    valorTotal,
    pecasUsadas,
    servicos,
  }: CreateOrdemServicoUseCaseParams): Promise<CreateOrdemServicoUseCaseResponse> {
    //caso de uso de criação de uma nova ordem de serviço
    //realizar verificações de dados(cliente, veiculo, mecanico, etc)
    //salvar no banco de dados
    //solicitar a criação dos itens de produto e serviços e verificar se foram criados corretamente
    //retornar a ordem de serviço criada

    const servico = await this.servicoRepository.create({
      clienteId,
      veiculoId,
      km,
      mecanicoId,
      desconto,
      valorTotal,
    }); // Cria uma nova ordem de serviço no repositório

    return { servico }; // Retorna a ordem de serviço criada
  }
}
