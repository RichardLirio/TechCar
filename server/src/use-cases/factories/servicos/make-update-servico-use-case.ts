import { PrismaServicoRepository } from "@/repositories/prisma/prisma-servico-repository";
import { UpdateServicoUseCase } from "@/use-cases/servicos-use-cases/update-servico";

export function makeUpdateServicoUseCase() {
  const servicoRepository = new PrismaServicoRepository();
  const updateServicoUseCase = new UpdateServicoUseCase(servicoRepository);

  return updateServicoUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
