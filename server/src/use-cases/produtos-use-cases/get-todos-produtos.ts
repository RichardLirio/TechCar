import { ProdutoRepository } from "@/repositories/produto-repository";
import { Produto } from "@prisma/client";

interface GetProdutosCaseResponse {
  produtos: Produto[];
} // Cria uma interface para a resposta do caso de uso

export class GetAllProdutosUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute(): Promise<GetProdutosCaseResponse> {
    const produtos = await this.produtoRepository.findMany(); // Busca todos os produtos no repositório

    return { produtos }; //  Retorna a lista de produtos encontrados
  }
}
