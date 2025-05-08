import { PrismaOrdemServicoRepository } from "@/repositories/prisma/prisma-ordem-servico-repository";
import { GetOrdemServicoUseCase } from "@/use-cases/ordem-servico-use-cases/get-ordem-servico";

export function makeGetOrdemServicoUseCase() {
  const OrdemServicoRepository = new PrismaOrdemServicoRepository();
  const GetUseCase = new GetOrdemServicoUseCase(OrdemServicoRepository);

  return GetUseCase; // Retorna uma instância do caso de uso de criação de ordemservicos
}
