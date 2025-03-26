import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const authenticateUsuarioUseCase = new AuthenticateUseCase(usuarioRepository);

  return authenticateUsuarioUseCase;
}
