import { prisma } from "@/lib/prisma";
import { Cliente, Prisma } from "@prisma/client";
import { ClienteRepository } from "../cliente-repository";
/// Define a classe PrismaClientRepository que implementa a interface ClientRepository
/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaClientRepository implements ClienteRepository {
  async findBycpfCnpj(cpfCnpj: string) {
    // Busca um cliente pelo CPF ou CNPJ no banco de dados
    const Client = await prisma.cliente.findUnique({
      where: {
        cpfCnpj,
      },
    });

    return Client; // Retorna o cliente encontrado ou null se não existir
  }

  findById(id: string) {
    // Busca um cliente pelo ID no banco de dados
    return prisma.cliente.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async findMany() {
    // Busca todos os clientes no banco de dados
    const Client = await prisma.cliente.findMany();

    return Client; // Retorna a lista de clientes encontrados
  }

  async create(data: Prisma.ClienteCreateInput) {
    // Cria um novo cliente no banco de dados
    const Client = await prisma.cliente.create({
      data,
    });

    return Client; // Retorna o cliente criado
  }
}
