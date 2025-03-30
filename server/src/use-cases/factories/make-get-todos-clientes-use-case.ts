import { GetAllClientesUseCase } from "../clientes-use-cases/get-todos-clientes";
import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";

export function makeGetAllClientesUseCase() {
  const clienteRepository = new PrismaClientRepository();
  const getAllClientesUseCase = new GetAllClientesUseCase(clienteRepository);

  return getAllClientesUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
