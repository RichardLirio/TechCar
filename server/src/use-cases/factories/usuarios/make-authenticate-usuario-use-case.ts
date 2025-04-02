import { PrismaUserRepository } from "@/repositories/prisma/prisma-usuario-repository";
import { AuthenticateUseCase } from "@/use-cases/usuarios-use-cases/authenticate";

export function makeAuthenticateUsuarioUseCase() {
  const usuarioRepository = new PrismaUserRepository();
  const authenticateUsuarioUseCase = new AuthenticateUseCase(usuarioRepository);

  return authenticateUsuarioUseCase; // Retorna uma instância do caso de uso de autenticação de usuário
}
