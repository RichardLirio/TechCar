import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { UpdateVeiculoUseCase } from "@/use-cases/veiculos-use-cases/update-veiculo";

export function makeUpdateVeiculoUseCase() {
  const VeiculoRepository = new PrismaVeiculoRepository();
  const ClienteRepository = new PrismaClientRepository();
  const updateVeiculoUseCase = new UpdateVeiculoUseCase(
    VeiculoRepository,
    ClienteRepository
  );

  return updateVeiculoUseCase; // Retorna uma instância do caso de uso de busca um unico veiculo
}
