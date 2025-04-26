import { OrdemServico, Prisma } from "@prisma/client";

export interface OrdemServicoRepository {
  create(data: Prisma.OrdemServicoUncheckedCreateInput): Promise<OrdemServico>;
  //   findByNome(nome: string): Promise<Produto | null>;
  findById(id: number): Promise<OrdemServico | null>;
  deleteById(id: number): Promise<OrdemServico>;
  findMany(): Promise<OrdemServico[]>;
  update(data: Prisma.OrdemServicoUncheckedUpdateInput): Promise<OrdemServico>;
}
