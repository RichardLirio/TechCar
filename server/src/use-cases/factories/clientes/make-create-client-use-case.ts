import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { CreateClienteUseCase } from "@/use-cases/clientes-use-cases/create-cliente";

export function makeCreateClientUseCase() {
  const ClientRepository = new PrismaClientRepository();
  const createUseCase = new CreateClienteUseCase(ClientRepository);

  return createUseCase; // Retorna uma instância do caso de uso de criação de cliente
}
