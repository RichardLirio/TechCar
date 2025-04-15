import { prisma } from "@/lib/prisma";
import { ServicoRepository } from "../servico-repository";
import { Prisma, Servico } from "@prisma/client";

/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaServicoRepository implements ServicoRepository {
  async findById(id: number): Promise<Servico | null> {
    // Busca um servico pelo ID no banco de dados
    const servico = await prisma.servico.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        descricao: true,
        valorServico: true,
        itens_servico: {
          select: {
            id: true,
            ordem: true,
            ordemId: true,
            servicoId: true,
            quantidade: true,
            valor: true,
            servicos: true,
          },
        },
      },
    });

    return servico; // Retorna o servico encontrado ou null se não existir
  }

  async findByNome(descricao: string) {
    // Busca um servico pelo nome
    const servico = await prisma.servico.findFirst({
      where: {
        descricao,
      },
    });

    return servico; // Retorna o servico encontrado ou null se não existir
  }

  async create(data: Prisma.ServicoCreateInput) {
    // Cria um novo servico no banco de dados
    const servico = await prisma.servico.create({
      data,
    });

    return servico; // Retorna o servico criado
  }

  async deleteById(id: number) {
    // Busca um servico pelo ID no banco de dados
    const servico = await prisma.servico.delete({
      where: {
        id,
      },
    });

    return servico; // Retorna o servico encontrado ou null se não existir
  }

  async findMany() {
    const servicos = await prisma.servico.findMany({
      select: {
        id: true,
        descricao: true,
        valorServico: true,
        itens_servico: {
          select: {
            id: true,
            ordem: true,
            ordemId: true,
            servicoId: true,
            quantidade: true,
            valor: true,
            servicos: true,
          },
        },
      },
    });
    return servicos; // Retorna todos os servicos encontrados
  }
} // Busca todos os servicos no banco de dados
