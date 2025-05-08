import { prisma } from "@/lib/prisma";
import { OrdemServicoRepository } from "../ordem-servico-repository";
import { Prisma, OrdemServico } from "@prisma/client";
/// Define a classe PrismaOrdemServicoRepository que implementa a interface OrdemServicoRepository
/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaOrdemServicoRepository implements OrdemServicoRepository {
  async create(data: Prisma.OrdemServicoUncheckedCreateInput) {
    const ordemServico = await prisma.ordemServico.create({
      data,
    });

    return ordemServico; // Retorna a ordem de serviço criada
  }

  async findById(id: number) {
    // Busca uma ordem de serviço pelo ID no banco de dados
    return await prisma.ordemServico.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cliente: true,
        veiculo: true,
        desconto: true,
        km: true,
        valorTotal: true,
        pecasUsadas: true,
        servicos: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    // Retorna a ordem de serviço encontrada ou null se não existir
  }

  async deleteById(id: number) {
    // Busca um ordemServico pelo ID no banco de dados
    const ordemServico = await prisma.ordemServico.delete({
      where: {
        id,
      },
    });

    return ordemServico; // Retorna o ordemServico encontrado ou null se não existir
  }

  async findMany() {
    // Busca todos as ordens de servico no banco de dados
    const ordensServicos = await prisma.ordemServico.findMany();

    return ordensServicos; // Retorna a lista de clientes encontrados
  }

  async update(data: Prisma.OrdemItemServicoUncheckedCreateInput) {
    const ordemServico = await prisma.ordemServico.update({
      where: {
        id: data.id,
      },
      data,
    });

    return ordemServico; // Retorna a ordem de serviço encontrada ou null se não existir
  }

  async findByVeiculo(veiculoId: number) {
    // Busca uma ordem de serviço pelo ID do veículo no banco de dados
    return await prisma.ordemServico.findMany({
      where: {
        veiculoId,
      },
    });
    // Retorna a ordem de serviço encontrada ou null se não existir
  }

  async findByCliente(clienteId: number) {
    // Busca uma ordem de serviço pelo ID do veículo no banco de dados
    return await prisma.ordemServico.findMany({
      where: {
        clienteId,
      },
    });
    // Retorna a ordem de serviço encontrada ou null se não existir
  }
}
