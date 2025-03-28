import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { CreateUserUseCase } from "../usuarios-use-cases/create-usuario";

export function makeCreateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const createUseCase = new CreateUserUseCase(usuarioRepository);

  return createUseCase;
}
