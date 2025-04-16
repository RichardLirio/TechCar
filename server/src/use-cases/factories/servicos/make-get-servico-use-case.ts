import { PrismaServicoRepository } from "@/repositories/prisma/prisma-servico-repository";
import { GetServicoUseCase } from "@/use-cases/servicos-use-cases/get-servico";

export function makeGetServicoUseCase() {
  const ServicoRepository = new PrismaServicoRepository();
  const getServicoUseCase = new GetServicoUseCase(ServicoRepository);

  return getServicoUseCase; // Retorna uma instância do caso de uso de criação de servico
}
