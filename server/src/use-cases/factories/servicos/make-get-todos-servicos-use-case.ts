import { PrismaServicoRepository } from "@/repositories/prisma/prisma-servico-repository"; // Importa o repositório PrismaServicoRepository
import { GetAllServicosUseCase } from "@/use-cases/servicos-use-cases/get-todos-servicos";

export function makeGetAllServicosUseCase() {
  const servicoRepository = new PrismaServicoRepository();
  const getAllServicoUseCase = new GetAllServicosUseCase(servicoRepository);

  return getAllServicoUseCase; // Retorna uma instância do caso de uso para deletar um servico
}
