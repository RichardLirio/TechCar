import { Prisma, Usuario } from "@prisma/client";

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
}
