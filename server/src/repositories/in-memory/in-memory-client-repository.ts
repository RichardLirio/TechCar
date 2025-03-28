import { Cliente, Prisma } from "@prisma/client";
import { ClientRepository } from "../client-repository";

export class InMemoryClientRepository implements ClientRepository {
  public items: Cliente[] = [];

  async findBycpfCnpj(cpfCnpj: string) {
    const Client = this.items.find((item) => item.cpfCnpj === cpfCnpj);

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
      cpfCnpj: data.cpfCnpj,
      telefone: data.telefone ?? "2799991234",
      tipo: data.tipo ?? "FISICA",
    };

    this.items.push(Client);

    return Client;
  }
}
