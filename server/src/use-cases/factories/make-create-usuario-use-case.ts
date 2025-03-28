import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { CreateUserUseCase } from "../usuarios-use-cases/create-usuario";

export function makeCreateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const createUseCase = new CreateUserUseCase(usuarioRepository);

  return createUseCase; // Retorna uma instância do caso de uso de criação de usuário
}
