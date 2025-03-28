import { Prisma, Usuario } from "@prisma/client";
import { UsuarioRepository } from "../usuario-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsuarioRepository {
  public items: Usuario[] = [];

  async findMany() {
    return this.items;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const usuario = this.items.find((item) => item.email === email);

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async create(data: Prisma.UsuarioCreateInput) {
    const usuario = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ? data.role : "USER",
      createdAt: new Date(),
    };

    this.items.push(usuario);

    return usuario;
  }
}
