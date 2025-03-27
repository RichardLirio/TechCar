import { Cliente, Prisma } from "@prisma/client";
import { ClientRepository } from "../client-repository";

export class InMemoryClientRepository implements ClientRepository {
  public items: Cliente[] = [];

  async findByCpf(cpf: string) {
    const Client = this.items.find((item) => item.cpf === cpf);

    if (!Client) {
      return null;
    }

    return Client;
  }

  async create(data: Prisma.ClienteCreateInput) {
    let i = this.items.length;
    const Client = {
      id: i++,
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone ?? "2799991234",
    };

    this.items.push(Client);

    return Client;
  }
}
