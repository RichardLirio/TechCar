import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { DeleteUserUseCase } from "../usuarios-use-cases/delete-usuario";

export function makeDeleteUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const deleteUsuarioUseCase = new DeleteUserUseCase(usuarioRepository);

  return deleteUsuarioUseCase; // Retorna uma instância do caso de uso de deleção de usuário
}
