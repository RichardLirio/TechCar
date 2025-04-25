import { OrdemItem, Prisma } from "@prisma/client";

export interface OrdemItemProdutoRepository {
  create(data: Prisma.OrdemItemUncheckedCreateInput): Promise<OrdemItem>;
  //   findByNome(nome: string): Promise<Produto | null>;
  findById(id: number): Promise<OrdemItem | null>;
  //   deleteById(id: number): Promise<Produto>;
  //findMany(): Promise<Produto[]>;
  //   update(data: Prisma.ProdutoUncheckedUpdateInput): Promise<Produto | null>;
}
