import { Prisma, Produto, Veiculo } from "@prisma/client";
import { ProdutoRepository } from "../produto-repository";

export class InMemoryProdutoRepository implements ProdutoRepository {
  public items: Produto[] = []; // Armazena os produtos em memória

  // Encontra um produto pelo nome
  async findByNome(nome: string) {
    const produto = this.items.find((item) => item.nome === nome);
    if (!produto) {
      return null; // Retorna null se o produto não for encontrado
    } // Retorna o produto encontrado ou null

    return produto; // Retorna o produto encontrado
  }

  // Cria um novo veiculo em memória
  async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    const id = this.items.length + 1;

    const produto: Produto = {
      id,
      nome: data.nome,
      quantidade: data.quantidade,
      valorUnitario: data.valorUnitario,
    };

    this.items.push(produto); // Adiciona o Produto à lista de produtos em memória

    return produto; // Retorna o Produto criado
  }
}
