import { PrismaOrdemServicoRepository } from "@/repositories/prisma/prisma-ordem-servico-repository";
import { FetchOrdensServicosUseCase } from "@/use-cases/ordem-servico-use-cases/fetch-ordens-servicos";

export function makeFetchOrdemServicoUseCase() {
  const OrdemServicoRepository = new PrismaOrdemServicoRepository();
  const FetchUseCase = new FetchOrdensServicosUseCase(OrdemServicoRepository);

  return FetchUseCase; // Retorna uma instância do caso de uso de criação de ordemservicos
}
