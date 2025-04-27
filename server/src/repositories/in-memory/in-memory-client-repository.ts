import { Cliente, Prisma } from "@prisma/client";
import { ClienteRepository } from "../cliente-repository";
/// Define a classe InMemoryClientRepository que implementa a interface ClientRepository
/// Essa classe é responsável por armazenar os clientes em memória
export class InMemoryClientRepository implements ClienteRepository {
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

  async findById(id: number) {
    // Busca um cliente pelo ID

    const cliente = this.items.find((item) => item.id === id); // Encontra o usuário pelo ID

    if (!cliente) {
      return null; // Se o cliente não for encontrado, retorna null
    }

    return cliente; // Retorna o cliente encontrado ou null se não existir
  }

  async findMany() {
    // Busca todos os clientes
    return this.items; // Retorna a lista de clientes encontrados
  }

  async create(data: Prisma.ClienteCreateInput) {
    // Cria um novo cliente em memória
    let i = this.items.length;
    const Client = {
      id: i + 1,
      nome: data.nome,
      cpfCnpj: data.cpfCnpj,
      telefone: data.telefone ?? "2799991234",
      tipo: data.tipo ?? "FISICA",
    };

    this.items.push(Client); // Adiciona o cliente à lista de clientes em memória

    return Client; // Retorna o cliente criado
  }

  async deleteById(id: number): Promise<Cliente> {
    // Deleta um cliente pelo ID
    const index = this.items.findIndex((item) => item.id === id); // Encontra o índice do cliente pelo ID
    const [cliente] = this.items.splice(index, 1); // Remove o cliente da lista de clientes em memória

    return cliente; // Retorna o cliente removido ou null se não existir
  }

  async update(data: Prisma.ClienteUncheckedUpdateInput) {
    // Atualiza um cliente em memória
    const index = this.items.findIndex((item) => item.id === data.id); // Encontra o cliente pelo ID

    Object.assign(this.items[index], data); // Atualiza os dados do cliente encontrado

    return this.items[index]; // Retorna o cliente encontrado ou null se não existir
  }
}
