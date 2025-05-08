import { GetOrdemServicoCaseResponseType } from "@/use-cases/ordem-servico-use-cases/get-ordem-servico";
import { OrdemServico, Prisma } from "@prisma/client";

export interface OrdemServicoRepository {
  create(data: Prisma.OrdemServicoUncheckedCreateInput): Promise<OrdemServico>;
  findByVeiculo(veiculoId: number): Promise<OrdemServico[] | null>;
  findByCliente(clienteId: number): Promise<OrdemServico[] | null>;
  findById(id: number): Promise<GetOrdemServicoCaseResponseType | null>;
  deleteById(id: number): Promise<OrdemServico>;
  findMany(): Promise<OrdemServico[]>;
  update(data: Prisma.OrdemServicoUncheckedUpdateInput): Promise<OrdemServico>;
}
