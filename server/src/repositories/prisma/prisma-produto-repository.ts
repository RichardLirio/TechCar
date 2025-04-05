import { prisma } from "@/lib/prisma";
import { ProdutoRepository } from "../produto-repository";
import { Prisma, Produto } from "@prisma/client";

/// Essa classe é responsável por interagir com o banco de dados usando o Prisma
export class PrismaProdutoRepository implements ProdutoRepository {
  async findById(id: number): Promise<Produto | null> {
    // Busca um produto pelo ID no banco de dados
    const produto = await prisma.produto.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        quantidade: true,
        valorUnitario: true,
        ordens_itens: {
          where: {
            produtoId: id,
          },
        },
      },
    });

    return produto; // Retorna o produto encontrado ou null se não existir
  }

  async findByNome(nome: string) {
    // Busca um produto pelo nome
    const produto = await prisma.produto.findFirst({
      where: {
        nome,
      },
    });

    return produto; // Retorna o produto encontrado ou null se não existir
  }

  async create(data: Prisma.ProdutoCreateInput) {
    // Cria um novo produto no banco de dados
    const produto = await prisma.produto.create({
      data,
    });

    return produto; // Retorna o produto criado
  }

  async deleteById(id: number) {
    // Busca um produto pelo ID no banco de dados
    const produto = await prisma.produto.delete({
      where: {
        id,
      },
    });

    return produto; // Retorna o produto encontrado ou null se não existir
  }
}
