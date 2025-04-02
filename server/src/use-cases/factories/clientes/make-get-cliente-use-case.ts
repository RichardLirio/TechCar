import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { GetClienteUseCase } from "@/use-cases/clientes-use-cases/get-cliente";

export function makeGetClienteUseCase() {
  const ClienteRepository = new PrismaClientRepository();
  const getClienteUseCase = new GetClienteUseCase(ClienteRepository);

  return getClienteUseCase; // Retorna uma instância do caso de uso de criação de cliente
}
