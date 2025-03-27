import { Prisma, Cliente } from "@prisma/client";

export interface ClientRepository {
  findByCpf(cpf: string): Promise<Cliente | null>;
  create(data: Prisma.ClienteCreateInput): Promise<Cliente>;
}
