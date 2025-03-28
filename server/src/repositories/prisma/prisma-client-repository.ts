import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ClientRepository } from "../client-repository";
/// Define a classe PrismaClientRepository que implementa a interface ClientRepository
/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaClientRepository implements ClientRepository {
  async findBycpfCnpj(cpfCnpj: string) {
    // Busca um cliente pelo CPF ou CNPJ no banco de dados
    const Client = await prisma.cliente.findUnique({
      where: {
        cpfCnpj,
      },
    });

    return Client; // Retorna o cliente encontrado ou null se não existir
  }

  async create(data: Prisma.ClienteCreateInput) {
    // Cria um novo cliente no banco de dados
    const Client = await prisma.cliente.create({
      data,
    });

    return Client; // Retorna o cliente criado
  }
}
