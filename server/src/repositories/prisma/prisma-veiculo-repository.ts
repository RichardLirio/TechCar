import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { VeiculoRepository } from "../veiculo-repository";
/// Define a classe PrismaVeiculoRepository que implementa a interface VeiculoRepository
/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaVeiculoRepository implements VeiculoRepository {
  async findByPlaca(placa: string) {
    // Busca um veiculo pela placa no banco de dados
    const veiculo = await prisma.veiculo.findUnique({
      where: {
        placa,
      },
    });

    return veiculo; // Retorna o veiculo encontrado ou null se não existir
  }

  findById(id: number) {
    // Busca um veiculo pelo ID no banco de dados
    return prisma.veiculo.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        clienteId: true,
        placa: true,
        modelo: true,
        marca: true,
        ano: true,
        ordens_servico: true,
      },
    });
  }

  async findMany() {
    // Busca todos os veiculos no banco de dados
    const Veiculos = await prisma.veiculo.findMany();

    return Veiculos; // Retorna a lista de veiculos encontrados
  }

  async create(data: Prisma.VeiculoUncheckedCreateInput) {
    // Cria um novo veiculo no banco de dados
    const Veiculo = await prisma.veiculo.create({
      data,
    });

    return Veiculo; // Retorna o veiculo criado
  }

  async update(data: Prisma.VeiculoUncheckedCreateInput) {
    // Atualiza um veiculo no banco de dados
    const veiculo = prisma.veiculo.update({
      where: {
        id: data.id,
      },
      data,
    });

    return veiculo; // Retorna o cliente encontrado ou null se não existir
  }

  async deleteById(id: number) {
    // Busca um veiculo pelo ID no banco de dados
    const veiculo = await prisma.veiculo.delete({
      where: {
        id,
      },
    });

    return veiculo; // Retorna o veiculo encontrado ou null se não existir
  }
}
