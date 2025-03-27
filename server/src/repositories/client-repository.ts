import { Prisma, Cliente } from "@prisma/client";

export interface ClientRepository {
  findBycpfCnpj(cpfCnpj: string): Promise<Cliente | null>;
  create(data: Prisma.ClienteCreateInput): Promise<Cliente>;
}
