import { OrdemItem, Prisma, Produto } from "@prisma/client";
import { OrdemItemProdutoRepository } from "../ordem-item-produtos-repository";

export class InMemoryOrdemItemProdutoRepository
  implements OrdemItemProdutoRepository
{
  public items: OrdemItem[] = []; // Armazena os itens de produtos da ordem de serviço em memória

  // Cria um novo veiculo em memória
  async create(data: Prisma.OrdemItemUncheckedCreateInput): Promise<OrdemItem> {
    const id = this.items.length + 1;

    const ordemItemServico: OrdemItem = {
      id,
      ordemId: data.ordemId,
      produtoId: data.produtoId,
      quantidadeUsada: data.quantidadeUsada,
      valorUnitarioPeca: data.valorUnitarioPeca,
    };

    this.items.push(ordemItemServico); // Adiciona o Produto à lista de itens de produtos da ordem de serviço em memória

    return ordemItemServico; // Retorna o item criado
  }

  //   async deleteById(id: number): Promise<Produto> {
  //     // Deleta um produto pelo ID
  //     const index = this.items.findIndex((item) => item.id === id); // Encontra o índice do produto pelo ID
  //     const [produto] = this.items.splice(index, 1); // Remove o produto da lista de itens de produtos da ordem de serviço em memória

  //     return produto; // Retorna o produto removido ou null se não existir
  //   }

  async findById(id: number): Promise<OrdemItem | null> {
    // Busca um item de produto pelo ID

    const itemOrdemServico = this.items.find((item) => item.id === id); // Encontra o cliente pelo ID

    if (!itemOrdemServico) {
      return null; // Se o itemOrdemServico não for encontrado, retorna null
    }

    return itemOrdemServico; // Retorna o itemOrdemServico encontrado ou null se não existir
  }

  //   async findMany(): Promise<Produto[]> {
  //     // Busca todos os itens de produtos da ordem de serviço em memória
  //     return this.items;
  //   }

  //   async update(data: Prisma.ProdutoUncheckedUpdateInput) {
  //     // Atualiza um produto em memória
  //     const produto = this.items.find((item) => item.id === data.id); // Encontra o produto pelo ID

  //     if (!produto) {
  //       // Se o produto não for encontrado, retorna null
  //       return null;
  //     }

  //     Object.assign(produto, data); // Atualiza os dados do produto encontrado

  //     return produto; // Retorna o produto encontrado ou null se não existir
  //   }
}
