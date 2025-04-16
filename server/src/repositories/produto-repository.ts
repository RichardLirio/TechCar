import { Prisma, Produto } from "@prisma/client";

export interface ProdutoRepository {
  create(data: Prisma.ProdutoCreateInput): Promise<Produto>;
  findByNome(nome: string): Promise<Produto | null>;
  findById(id: number): Promise<Produto | null>;
  deleteById(id: number): Promise<Produto>;
  findMany(): Promise<Produto[]>;
  update(data: Prisma.ProdutoUncheckedUpdateInput): Promise<Produto | null>;
}
