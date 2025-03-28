import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsuarioRepository } from "../usuario-repository";

export class PrismaUserRepository implements UsuarioRepository {
  async findById(id: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    return usuario;
  }

  async findByEmail(email: string) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    return usuario;
  }

  async create(data: Prisma.UsuarioCreateInput) {
    const usuario = await prisma.usuario.create({
      data,
    });

    return usuario;
  }
}
