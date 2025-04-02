import { Prisma, Veiculo } from "@prisma/client";

export interface VeiculoRepository {
  create(data: Prisma.VeiculoUncheckedCreateInput): Promise<Veiculo>;
  findByPlaca(placa: string): Promise<Veiculo | null>;
  findById(id: number): Promise<Veiculo | null>;
  findMany(): Promise<Veiculo[]>;
}
