import { PrismaProdutoRepository } from "@/repositories/prisma/prisma-produto-repository"; // Importa o repositório PrismaProdutoRepository
import { DeleteProdutoUseCase } from "@/use-cases/produtos-use-cases/delete-produto";

export function makeDeleteProdutoUseCase() {
  const produtoRepository = new PrismaProdutoRepository();
  const deleteProdutoUseCase = new DeleteProdutoUseCase(produtoRepository);

  return deleteProdutoUseCase; // Retorna uma instância do caso de uso para deletar um produto
}
