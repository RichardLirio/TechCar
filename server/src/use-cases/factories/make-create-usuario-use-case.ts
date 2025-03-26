import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { CreateUserUseCase } from "../create-usuario";

export function makeCreateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const createUseCase = new CreateUserUseCase(usuarioRepository);

  return createUseCase;
}
