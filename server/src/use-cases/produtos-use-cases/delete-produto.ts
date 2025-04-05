import { ProdutoRepository } from "@/repositories/produto-repository";
import { Produto } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteProdutoUseCaseParams {
  produtoId: number;
}

interface DeleteProdutoUseCaseResponse {
  produto: Produto;
} // Cria uma interface para a resposta do caso de uso

export class DeleteProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    produtoId,
  }: DeleteProdutoUseCaseParams): Promise<DeleteProdutoUseCaseResponse> {
    // Verifica se o produto existe
    const produto = await this.produtoRepository.deleteById(produtoId);
    // Se o produto não existir, lança um erro
    if (!produto) {
      throw new ResourceNotFoundError();
    }

    return { produto }; // Retorna o cliente excluído
  }
}
