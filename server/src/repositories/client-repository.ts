import { Prisma, Cliente } from "@prisma/client";
/// Define a interface do repositório de clientes
/// Essa interface define os métodos que o repositório deve implementar
export interface ClientRepository {
  findBycpfCnpj(cpfCnpj: string): Promise<Cliente | null>;
  create(data: Prisma.ClienteCreateInput): Promise<Cliente>;
}
