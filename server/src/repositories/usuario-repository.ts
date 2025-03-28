import { Prisma, Usuario } from "@prisma/client";

export interface UsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  findById(userId: string): Promise<Usuario | null>;
  findMany(): Promise<Usuario[]>;
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  deleteById(userId: string): Promise<Usuario | null>;
  update(data: Prisma.UsuarioCreateInput): Promise<Usuario | null>;
}
