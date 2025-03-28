import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { GetAllUsersUseCase } from "../usuarios-use-cases/get-todos-usuarios";

export function makeGetAllUsersUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const getAllUsuariosUseCase = new GetAllUsersUseCase(usuarioRepository);

  return getAllUsuariosUseCase; // Retorna uma instância do caso de uso de obtenção de todos os usuários
}
