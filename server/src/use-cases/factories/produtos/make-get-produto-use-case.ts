import { PrismaProdutoRepository } from "@/repositories/prisma/prisma-produto-repository";
import { GetProdutoUseCase } from "@/use-cases/produtos-use-cases/get-produto";

export function makeGetProdutoUseCase() {
  const ProdutoRepository = new PrismaProdutoRepository();
  const getProdutoUseCase = new GetProdutoUseCase(ProdutoRepository);

  return getProdutoUseCase; // Retorna uma instância do caso de uso de criação de produto
}
