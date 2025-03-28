import { prisma } from "@/lib/prisma";
import { Prisma, Usuario } from "@prisma/client";
import { UsuarioRepository } from "../usuario-repository";

export class PrismaUserRepository implements UsuarioRepository {
  async findMany() {
    const usuarios = await prisma.usuario.findMany();

    return usuarios;
  }

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

  async deleteById(id: string) {
    const usuario = await prisma.usuario.delete({
      where: {
        id,
      },
    });

    return usuario;
  }

  async update(data: Prisma.UsuarioCreateInput) {
    const usuario = prisma.usuario.update({
      where: {
        id: data.id,
      },
      data,
    });

    return usuario;
  }
}
