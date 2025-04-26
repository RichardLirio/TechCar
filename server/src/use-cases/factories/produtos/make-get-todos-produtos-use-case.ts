import { PrismaProdutoRepository } from "@/repositories/prisma/prisma-produto-repository"; // Importa o repositório PrismaProdutoRepository
import { GetAllProdutosUseCase } from "@/use-cases/produtos-use-cases/fetch-produtos";

export function makeGetAllProdutosUseCase() {
  const produtoRepository = new PrismaProdutoRepository();
  const getAllProdutosUseCase = new GetAllProdutosUseCase(produtoRepository);

  return getAllProdutosUseCase; // Retorna uma instância do caso de uso para deletar um produto
}
