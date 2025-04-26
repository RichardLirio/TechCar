import { OrdemServico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";

interface GetOrdemServicoCaseParams {
  ordemServicoId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetOrdemServicoCaseResponse {
  ordemServico: OrdemServico;
} // Cria uma interface para a resposta do caso de uso

export class GetOrdemServicoUseCase {
  constructor(private ordemServicoRepository: OrdemServicoRepository) {}

  async execute({
    ordemServicoId,
  }: GetOrdemServicoCaseParams): Promise<GetOrdemServicoCaseResponse> {
    const ordemServico = await this.ordemServicoRepository.findById(
      ordemServicoId
    ); // Busca a ordem de serviço pelo ID no repositório

    if (!ordemServico) {
      throw new ResourceNotFoundError(); // Lança um erro se a ordem de serviço não for encontrado
    }

    return { ordemServico }; // Retorna a ordem de serviço encontrado
  }
}
