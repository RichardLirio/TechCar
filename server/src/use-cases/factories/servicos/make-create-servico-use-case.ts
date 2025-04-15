import { CreateServicoUseCase } from "@/use-cases/servicos-use-cases/create-servico";
import { PrismaServicoRepository } from "@/repositories/prisma/prisma-servico-repository"; // Importa o repositório PrismaServicoRepository

export function makeCreateServicoUseCase() {
  const servicoRepository = new PrismaServicoRepository();
  const createServicoUseCase = new CreateServicoUseCase(servicoRepository);

  return createServicoUseCase; // Retorna uma instância do caso de uso de criação de um servico
}
