import { OrdemServico, Prisma } from "@prisma/client";

export interface OrdemServicoRepository {
  create(data: Prisma.OrdemServicoUncheckedCreateInput): Promise<OrdemServico>;
  //   findByNome(nome: string): Promise<Produto | null>;
  findById(id: number): Promise<OrdemServico | null>;
  //   deleteById(id: number): Promise<Produto>;
  //findMany(): Promise<Produto[]>;
  //   update(data: Prisma.ProdutoUncheckedUpdateInput): Promise<Produto | null>;
}
