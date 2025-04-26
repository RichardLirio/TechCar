import { Prisma, OrdemServico } from "@prisma/client";
import { OrdemServicoRepository } from "../ordem-servico-repository";

export class InMemoryOrdemServicoRepository implements OrdemServicoRepository {
  public items: OrdemServico[] = []; // Armazena os ordemservicos em memória

  // Cria um novo veiculo em memória
  async create(
    data: Prisma.OrdemServicoUncheckedCreateInput
  ): Promise<OrdemServico> {
    const id = this.items.length + 1;

    const ordemservico = {
      id,
      clienteId: data.clienteId,
      veiculoId: data.veiculoId,
      km: data.km,
      desconto: data.desconto ?? 0,
      valorTotal: data.valorTotal ?? 0,
      status: data.status ?? "ABERTA",
      createdAt: new Date(),
      updatedAt: null,
    };

    this.items.push(ordemservico); // Adiciona o OrdemServico à lista de ordemservicos em memória

    return ordemservico; // Retorna o OrdemServico criado
  }

  async deleteById(id: number): Promise<OrdemServico> {
    // Deleta um ordemservico pelo ID
    const index = this.items.findIndex((item) => item.id === id); // Encontra o índice da ordemServico pelo ID
    const [ordemServico] = this.items.splice(index, 1); // Remove a ordemServico da lista de ordemservicos em memória

    return ordemServico; // Retorna o ordemservico removido ou null se não existir
  }

  async findById(id: number): Promise<OrdemServico | null> {
    // Busca um item de ordemservico pelo ID

    const ordemservico = this.items.find((item) => item.id === id); // Encontra o cliente pelo ID

    if (!ordemservico) {
      return null; // Se o ordemservico não for encontrado, retorna null
    }

    return ordemservico; // Retorna o ordemservico encontrado ou null se não existir
  }

  async findMany(): Promise<OrdemServico[]> {
    // Busca todos os ordemservicos em memória
    return this.items;
  }

  //   async update(data: Prisma.OrdemServicoUncheckedUpdateInput) {
  //     // Atualiza um ordemservico em memória
  //     const ordemservico = this.items.find((item) => item.id === data.id); // Encontra o ordemservico pelo ID

  //     if (!ordemservico) {
  //       // Se o ordemservico não for encontrado, retorna null
  //       return null;
  //     }

  //     Object.assign(ordemservico, data); // Atualiza os dados do ordemservico encontrado

  //     return ordemservico; // Retorna o ordemservico encontrado ou null se não existir
  //   }
}
