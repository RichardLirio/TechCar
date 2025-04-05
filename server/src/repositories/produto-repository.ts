import { Prisma, Produto } from "@prisma/client";

export interface ProdutoRepository {
  create(data: Prisma.ProdutoCreateInput): Promise<Produto>;
  findByNome(nome: string): Promise<Produto | null>;
}
