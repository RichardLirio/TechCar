import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { UpdateUserUseCase } from "../usuarios-use-cases/update-usuario-use-case";

export function makeUpdateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const updateUsuarioUseCase = new UpdateUserUseCase(usuarioRepository);

  return updateUsuarioUseCase; // Retorna uma instância do caso de uso de atualização de usuário
}
