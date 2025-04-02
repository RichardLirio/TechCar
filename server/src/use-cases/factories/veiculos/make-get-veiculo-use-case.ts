import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { GetVeiculoUseCase } from "@/use-cases/veiculos-use-cases/get-veiculo";

export function makeGetVeiculoUseCase() {
  const VeiculoRepository = new PrismaVeiculoRepository();
  const getVeiculoUseCase = new GetVeiculoUseCase(VeiculoRepository);

  return getVeiculoUseCase; // Retorna uma instância do caso de uso de busca um unico veiculo
}
