import { PrismaProdutoRepository } from "@/repositories/prisma/prisma-produto-repository";
import { UpdateProdutoUseCase } from "@/use-cases/produtos-use-cases/update-produto";

export function makeUpdateProdutoUseCase() {
  const produtoRepository = new PrismaProdutoRepository();
  const updateProdutoUseCase = new UpdateProdutoUseCase(produtoRepository);

  return updateProdutoUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
