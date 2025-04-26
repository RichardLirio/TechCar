import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { GetAllClientesUseCase } from "@/use-cases/clientes-use-cases/fetch-clientes";

export function makeGetAllClientesUseCase() {
  const clienteRepository = new PrismaClientRepository();
  const getAllClientesUseCase = new GetAllClientesUseCase(clienteRepository);

  return getAllClientesUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
