import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaOrdemServicoRepository } from "@/repositories/prisma/prisma-ordem-servico-repository";
import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { UpdateOrdemServicoUseCase } from "@/use-cases/ordem-servico-use-cases/update-ordem-servico";

export function makeUpdateOrdemServicoUseCase() {
  const OrdemServicoRepository = new PrismaOrdemServicoRepository();
  const clienteRepository = new PrismaClientRepository();
  const veiculoRepository = new PrismaVeiculoRepository(); // Cria uma instância do repositório de veículos
  const updateUseCase = new UpdateOrdemServicoUseCase(
    OrdemServicoRepository,
    clienteRepository,
    veiculoRepository
  ); // Cria uma instância do caso de uso de criação de ordemservicoe

  return updateUseCase; // Retorna uma instância do caso de uso de criação de ordemservicoe
}
