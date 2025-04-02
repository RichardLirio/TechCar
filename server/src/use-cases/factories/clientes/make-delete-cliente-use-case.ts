import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { DeleteClienteUseCase } from "@/use-cases/clientes-use-cases/delete-cliente";

export function makeDeleteClientUseCase() {
  const ClientRepository = new PrismaClientRepository();
  const deleteClienteUseCase = new DeleteClienteUseCase(ClientRepository);

  return deleteClienteUseCase; // Retorna uma instância do caso de uso de criação de cliente
}
