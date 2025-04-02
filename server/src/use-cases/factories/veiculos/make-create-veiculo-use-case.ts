import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { CreateVeiculoUseCase } from "@/use-cases/veiculos-use-cases/create-veiculos";

export function makeCreateVeiculoUseCase() {
  const VeiculoRepository = new PrismaVeiculoRepository();
  const ClienteRepository = new PrismaClientRepository();
  const createVeiculoUseCase = new CreateVeiculoUseCase(
    VeiculoRepository,
    ClienteRepository
  );

  return createVeiculoUseCase; // Retorna uma instância do caso de uso de criação de Veiculo
}
