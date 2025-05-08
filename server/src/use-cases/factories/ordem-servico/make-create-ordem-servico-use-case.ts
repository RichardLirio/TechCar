import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaOrdemServicoRepository } from "@/repositories/prisma/prisma-ordem-servico-repository";
import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { CreateOrdemServicoUseCase } from "@/use-cases/ordem-servico-use-cases/create-ordem-servico";

export function makeCreateOrdemServicoUseCase() {
  const OrdemServicoRepository = new PrismaOrdemServicoRepository();
  const clienteRepository = new PrismaClientRepository();
  const veiculoRepository = new PrismaVeiculoRepository(); // Cria uma instância do repositório de veículos
  const createUseCase = new CreateOrdemServicoUseCase(
    OrdemServicoRepository,
    clienteRepository,
    veiculoRepository
  ); // Cria uma instância do caso de uso de criação de ordemservicoe

  return createUseCase; // Retorna uma instância do caso de uso de criação de ordemservicoe
}
