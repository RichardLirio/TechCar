import { ServicoRepository } from "@/repositories/servico-repository";
import { Servico } from "@prisma/client";

interface GetServicosCaseResponse {
  servicos: Servico[];
} // Cria uma interface para a resposta do caso de uso

export class GetAllServicosUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute(): Promise<GetServicosCaseResponse> {
    const servicos = await this.servicoRepository.findMany(); // Busca todos os servicos no repositório

    return { servicos }; //  Retorna a lista de servicos encontrados
  }
}
