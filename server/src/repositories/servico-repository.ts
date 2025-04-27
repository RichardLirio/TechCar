import { Prisma, Servico } from "@prisma/client";

export interface ServicoRepository {
  create(data: Prisma.ServicoCreateInput): Promise<Servico>;
  findByNome(nome: string): Promise<Servico | null>;
  findById(id: number): Promise<Servico | null>;
  deleteById(id: number): Promise<Servico>;
  findMany(): Promise<Servico[]>;
  update(data: Prisma.ServicoUncheckedUpdateInput): Promise<Servico>;
}
