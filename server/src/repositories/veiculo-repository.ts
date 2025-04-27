import { Prisma, Veiculo } from "@prisma/client";

export interface VeiculoRepository {
  create(data: Prisma.VeiculoUncheckedCreateInput): Promise<Veiculo>;
  deleteById(id: number): Promise<Veiculo>;
  findByPlaca(placa: string): Promise<Veiculo | null>;
  findById(id: number): Promise<Veiculo | null>;
  findMany(): Promise<Veiculo[]>;
  update(data: Prisma.VeiculoUncheckedUpdateInput): Promise<Veiculo>;
}
