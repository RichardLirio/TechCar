import { Prisma, Veiculo } from "@prisma/client";
import { VeiculoRepository } from "../veiculo-repository";

export class InMemoryVeiculoRepository implements VeiculoRepository {
  public items: Veiculo[] = []; // Armazena os veiculos em memória

  // Encontra um veiculo pela placa
  async findByPlaca(placa: string) {
    const veiculo = this.items.find((item) => item.placa === placa);
    return veiculo || null; // Retorna o veiculo encontrado ou null
  }

  // Cria um novo veiculo em memória
  async create(data: Prisma.VeiculoUncheckedCreateInput): Promise<Veiculo> {
    const id = this.items.length + 1;

    const veiculo: Veiculo = {
      id,
      clienteId: data.clienteId,
      placa: data.placa,
      modelo: data.modelo,
      marca: data.marca,
      ano: data.ano || null,
    };

    this.items.push(veiculo); // Adiciona o Veiculo à lista de Veiculos em memória

    return veiculo; // Retorna o Veiculo criado
  }
}
