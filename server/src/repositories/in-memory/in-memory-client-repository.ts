import { Cliente, Prisma } from "@prisma/client";
import { ClientRepository } from "../client-repository";
/// Define a classe InMemoryClientRepository que implementa a interface ClientRepository
/// Essa classe é responsável por armazenar os clientes em memória
export class InMemoryClientRepository implements ClientRepository {
  public items: Cliente[] = []; // Armazena os clientes em memória

  async findBycpfCnpj(cpfCnpj: string) {
    // Busca um cliente pelo CPF ou CNPJ
    const Client = this.items.find((item) => item.cpfCnpj === cpfCnpj);

    if (!Client) {
      // Se o cliente não for encontrado, retorna null
      return null;
    }

    return Client; // Retorna o cliente encontrado ou null se não existir
  }

  async create(data: Prisma.ClienteCreateInput) {
    // Cria um novo cliente em memória
    let i = this.items.length;
    const Client = {
      id: i++,
      nome: data.nome,
      cpfCnpj: data.cpfCnpj,
      telefone: data.telefone ?? "2799991234",
      tipo: data.tipo ?? "FISICA",
    };

    this.items.push(Client); // Adiciona o cliente à lista de clientes em memória

    return Client; // Retorna o cliente criado
  }
}
