import { Prisma, Cliente } from "@prisma/client";
/// Define a interface do repositório de clientes
/// Essa interface define os métodos que o repositório deve implementar
export interface ClienteRepository {
  findBycpfCnpj(cpfCnpj: string): Promise<Cliente | null>;
  findById(id: number): Promise<Cliente | null>;
  findMany(): Promise<Cliente[]>;
  deleteById(id: number): Promise<Cliente>;
  create(data: Prisma.ClienteCreateInput): Promise<Cliente>;
  update(data: Prisma.ClienteUncheckedUpdateInput): Promise<Cliente>;
}
