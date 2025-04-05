import { CreateProdutoUseCase } from "@/use-cases/produtos-use-cases/create-produto";
import { PrismaProdutoRepository } from "@/repositories/prisma/prisma-produto-repository"; // Importa o repositório PrismaProdutoRepository

export function makeCreateProdutoUseCase() {
  const produtoRepository = new PrismaProdutoRepository();
  const createProdutoUseCase = new CreateProdutoUseCase(produtoRepository);

  return createProdutoUseCase; // Retorna uma instância do caso de uso de criação de um produto
}
