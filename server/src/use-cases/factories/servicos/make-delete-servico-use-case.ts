import { PrismaServicoRepository } from "@/repositories/prisma/prisma-servico-repository"; // Importa o repositório PrismaServicoRepository
import { DeleteServicoUseCase } from "@/use-cases/servicos-use-cases/delete-servico";

export function makeDeleteServicoUseCase() {
  const servicoRepository = new PrismaServicoRepository();
  const deleteServicoUseCase = new DeleteServicoUseCase(servicoRepository);

  return deleteServicoUseCase; // Retorna uma instância do caso de uso para deletar um servico
}
