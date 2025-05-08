import { PrismaOrdemServicoRepository } from "@/repositories/prisma/prisma-ordem-servico-repository";
import { DeleteOrdemServicoUseCase } from "@/use-cases/ordem-servico-use-cases/delete-ordem-servico";

export function makeDeleteOrdemServicoUseCase() {
  const OrdemServicoRepository = new PrismaOrdemServicoRepository();
  const deleteUseCase = new DeleteOrdemServicoUseCase(OrdemServicoRepository); // Cria uma instância do caso de uso de criação de ordemservicoe

  return deleteUseCase; // Retorna uma instância do caso de uso de criação de ordemservicoe
}
