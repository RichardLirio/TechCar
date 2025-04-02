import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { GetAllVeiculosUseCase } from "@/use-cases/veiculos-use-cases/get-todos-veiculos";

export function makeGetAllVeiculosUseCase() {
  const VeiculoRepository = new PrismaVeiculoRepository();
  const getAllVeiculosUseCase = new GetAllVeiculosUseCase(VeiculoRepository);

  return getAllVeiculosUseCase; // Retorna uma instância do caso de uso de busca de todos veiculos
}
