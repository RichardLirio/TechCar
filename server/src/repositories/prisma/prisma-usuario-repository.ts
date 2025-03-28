import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsuarioRepository } from "../usuario-repository";
/// Define a classe PrismaUserRepository que implementa a interface UsuarioRepository
/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaUserRepository implements UsuarioRepository {
  async findMany() {
    // Busca todos os usuários no banco de dados
    const usuarios = await prisma.usuario.findMany();

    return usuarios; // Retorna a lista de usuários encontrados
  }

  async findById(id: string) {
    // Busca um usuário pelo ID no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: {
        id,
      },
    });

    return usuario; // Retorna o usuário encontrado ou null se não existir
  }

  async findByEmail(email: string) {
    // Busca um usuário pelo email no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    return usuario; // Retorna o usuário encontrado ou null se não existir
  }

  async create(data: Prisma.UsuarioCreateInput) {
    // Cria um novo usuário no banco de dados
    const usuario = await prisma.usuario.create({
      data,
    });

    return usuario; // Retorna o usuário criado
  }

  async deleteById(id: string) {
    // Busca um usuário pelo ID no banco de dados
    const usuario = await prisma.usuario.delete({
      where: {
        id,
      },
    });

    return usuario; // Retorna o usuário encontrado ou null se não existir
  }

  async update(data: Prisma.UsuarioCreateInput) {
    // Atualiza um usuário no banco de dados
    const usuario = prisma.usuario.update({
      where: {
        id: data.id,
      },
      data,
    });

    return usuario; // Retorna o usuário encontrado ou null se não existir
  }
}
