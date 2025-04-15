import { Prisma, Servico, Veiculo } from "@prisma/client";
import { ServicoRepository } from "../servico-repository";
import { formatarDescricao } from "@/value-object/FormatarDescricao";

export class InMemoryServicoRepository implements ServicoRepository {
  public items: Servico[] = []; // Armazena os servicos em memória

  // Encontra um servico pelo nome
  async findByNome(descricao: string) {
    const servico = this.items.find((item) => item.descricao === descricao);
    if (!servico) {
      return null; // Retorna null se o servico não for encontrado
    } // Retorna o servico encontrado ou null

    return servico; // Retorna o servico encontrado
  }

  // Cria um novo veiculo em memória
  async create(data: Prisma.ServicoCreateInput): Promise<Servico> {
    const id = this.items.length + 1;

    const servico: Servico = {
      id,
      descricao: await formatarDescricao(data.descricao),
      valorServico: data.valorServico,
    };

    this.items.push(servico); // Adiciona o Servico à lista de servicos em memória

    return servico; // Retorna o Servico criado
  }

  async deleteById(id: number): Promise<Servico> {
    // Deleta um servico pelo ID
    const index = this.items.findIndex((item) => item.id === id); // Encontra o índice do servico pelo ID
    const [servico] = this.items.splice(index, 1); // Remove o servico da lista de servicos em memória

    return servico; // Retorna o servico removido ou null se não existir
  }

  async findById(id: number): Promise<Servico | null> {
    // Deleta um servico pelo ID
    const index = this.items.findIndex((item) => item.id === id); // Encontra o índice do servico pelo ID

    if (index === -1) {
      return null; // Se o servico não for encontrado, retorna null
    }

    const [servico] = this.items.splice(index, 1); // Remove o servico da lista de servicos em memória

    return servico; // Retorna o servico removido ou null se não existir
  }

  async findMany(): Promise<Servico[]> {
    // Busca todos os servicos em memória

    return this.items;
  }
}
