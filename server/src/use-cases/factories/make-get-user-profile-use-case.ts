import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { GetUserUseCase } from "../usuarios-use-cases/get-usuario";

export function makeGetUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const getUsuarioUseCase = new GetUserUseCase(usuarioRepository);

  return getUsuarioUseCase; // Retorna uma instância do caso de uso de obtenção de usuário
}
