import { ServicoRepository } from "@/repositories/servico-repository";
import { Servico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteServicoUseCaseParams {
  servicoId: number;
}

interface DeleteServicoUseCaseResponse {
  servico: Servico;
} // Cria uma interface para a resposta do caso de uso

export class DeleteServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute({
    servicoId,
  }: DeleteServicoUseCaseParams): Promise<DeleteServicoUseCaseResponse> {
    // Verifica se o servico existe

    const servicoExists = await this.servicoRepository.findById(servicoId);
    // Se o servico não existir, lança um erro
    if (!servicoExists) {
      throw new ResourceNotFoundError();
    }

    const servico = await this.servicoRepository.deleteById(servicoId);

    return { servico }; // Retorna o cliente excluído
  }
}
