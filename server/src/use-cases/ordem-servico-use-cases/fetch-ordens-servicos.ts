import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { OrdemServico } from "@prisma/client";

interface FetchOrdensServicosCaseResponse {
  ordensServicos: OrdemServico[];
} // Cria uma interface para a resposta do caso de uso

export class FetchOrdensServicosUseCase {
  constructor(private ordemServicoRepository: OrdemServicoRepository) {}

  async execute(): Promise<FetchOrdensServicosCaseResponse> {
    const ordensServicos = await this.ordemServicoRepository.findMany(); // Busca todos as ordens de servico no repositório

    return { ordensServicos }; //  Retorna a lista de usuários encontrados
  }
}
