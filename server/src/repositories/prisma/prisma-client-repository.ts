import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ClientRepository } from "../client-repository";

export class PrismaClientRepository implements ClientRepository {
  async findBycpfCnpj(cpfCnpj: string) {
    const Client = await prisma.cliente.findUnique({
      where: {
        cpfCnpj,
      },
    });

    return Client;
  }

  async create(data: Prisma.ClienteCreateInput) {
    const Client = await prisma.cliente.create({
      data,
    });

    return Client;
  }
}
