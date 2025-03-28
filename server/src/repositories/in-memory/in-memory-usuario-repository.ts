import { Prisma, Usuario } from "@prisma/client";
import { UsuarioRepository } from "../usuario-repository";
import { randomUUID } from "node:crypto";
/// Cria uma classe que implementa a interface do repositório de usuários
/// Essa classe é responsável por armazenar os usuários em memória
export class InMemoryUsersRepository implements UsuarioRepository {
  public items: Usuario[] = []; // Armazena os usuários em memória

  async deleteById(id: string) {
    // Busca um usuário pelo ID
    const user = this.items.find((item) => item.id === id); // Encontra o usuário pelo ID

    if (!user) {
      return null; // Se o usuário não for encontrado, retorna null
    }

    const userIndex = this.items.findIndex((item) => item.id === id); // Encontra o índice do usuário na lista de usuários

    this.items.splice(userIndex, 1); // Remove o usuário da lista de usuários em memória

    return user; // Retorna o usuário encontrado ou null se não existir
  }

  async findMany() {
    // Busca todos os usuários em memória
    return this.items;
  }

  async findById(id: string) {
    // Busca um usuário pelo ID
    const user = this.items.find((item) => item.id === id); // Encontra o usuário pelo ID

    if (!user) {
      return null; // Se o usuário não for encontrado, retorna null
    }

    return user; // Retorna o usuário encontrado ou null se não existir
  }

  async findByEmail(email: string) {
    // Busca um usuário pelo email
    const usuario = this.items.find((item) => item.email === email); // Encontra o usuário pelo email

    if (!usuario) {
      // Se o usuário não for encontrado, retorna null
      return null;
    }

    return usuario; // Retorna o usuário encontrado ou null se não existir
  }

  async create(data: Prisma.UsuarioCreateInput) {
    // Cria um novo usuário em memória
    const usuario = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role ? data.role : "USER",
      createdAt: new Date(),
    };

    this.items.push(usuario); // Adiciona o usuário à lista de usuários em memória

    return usuario; // Retorna o usuário criado
  }

  async update(data: Prisma.UsuarioCreateInput) {
    // Atualiza um usuário em memória
    const user = this.items.find((item) => item.id === data.id); // Encontra o usuário pelo ID

    if (!user) {
      // Se o usuário não for encontrado, retorna null
      return null;
    }

    Object.assign(user, data); // Atualiza os dados do usuário encontrado

    return user; // Retorna o usuário encontrado ou null se não existir
  }
}
