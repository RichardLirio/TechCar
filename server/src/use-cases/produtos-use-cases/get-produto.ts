import { Produto } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoRepository } from "@/repositories/produto-repository";

interface GetProdutoUseCaseParams {
  produtoId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetClienteUseCaseResponse {
  produto: Produto;
} // Cria uma interface para a resposta do caso de uso

export class GetProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    produtoId,
  }: GetProdutoUseCaseParams): Promise<GetClienteUseCaseResponse> {
    const produto = await this.produtoRepository.findById(produtoId); // Busca o cliente pelo ID no repositório

    if (!produto) {
      throw new ResourceNotFoundError(); // Lança um erro se o cliente não for encontrado
    }

    return { produto }; // Retorna o cliente encontrado
  }
}
