import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { UpdateClienteUseCase } from "@/use-cases/clientes-use-cases/update-cliente";

export function makeUpdateClienteUseCase() {
  const clienteRepository = new PrismaClientRepository();
  const updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);

  return updateClienteUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
