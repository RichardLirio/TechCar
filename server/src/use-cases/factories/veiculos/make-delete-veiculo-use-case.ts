import { PrismaVeiculoRepository } from "@/repositories/prisma/prisma-veiculo-repository";
import { DeleteVeiculoUseCase } from "@/use-cases/veiculos-use-cases/delete-veiculo";

export function makeDeleteVeiculoUseCase() {
  const VeiculoRepository = new PrismaVeiculoRepository();
  const deleteVeiculoUseCase = new DeleteVeiculoUseCase(VeiculoRepository);

  return deleteVeiculoUseCase; // Retorna uma instância do caso de uso de deletar um unico veiculo
}
