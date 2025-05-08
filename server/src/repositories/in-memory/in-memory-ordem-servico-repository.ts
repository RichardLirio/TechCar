import { Prisma, OrdemServico, Veiculo, Cliente } from "@prisma/client";
import { OrdemServicoRepository } from "../ordem-servico-repository";
import { GetOrdemServicoCaseResponseType } from "@/use-cases/ordem-servico-use-cases/get-ordem-servico";

export class InMemoryOrdemServicoRepository implements OrdemServicoRepository {
  public items: OrdemServico[] = []; // Armazena os ordemservicos em memória
  public veiculos: Veiculo[] = []; // Armazena os veiculos em memória
  public clientes: Cliente[] = []; // Armazena os clientes em memória

  async findByVeiculo(veiculoId: number): Promise<OrdemServico[] | null> {
    // Busca ordemservicos pelo ID do veículo
    const veiculo = this.veiculos.find((v) => v.id === veiculoId);
    if (!veiculo) {
      return null; // Retorna null se o veículo não for encontrado
    }
    const ordemServicos = this.items.filter(
      (item) => item.veiculoId === veiculo.id
    );
    return ordemServicos.length > 0 ? ordemServicos : null; // Retorna os ordemservicos encontrados ou null se não houver nenhum
  }

  async findByCliente(clienteId: number): Promise<OrdemServico[] | null> {
    // Busca ordemservicos pelo ID do cliente
    const cliente = this.clientes.find((c) => c.id === clienteId);
    if (!cliente) {
      return null; // Retorna null se o cliente não for encontrado
    }
    const ordemServicos = this.items.filter(
      (item) => item.clienteId === cliente.id
    );
    return ordemServicos.length > 0 ? ordemServicos : null; // Retorna os ordemservicos encontrados ou null se não houver nenhum
  }

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

    return ordemServico; // Retorna o ordemservico removido
  }

  async findById(id: number): Promise<GetOrdemServicoCaseResponseType | null> {
    // Busca um item de ordemservico pelo ID

    const ordemservico = this.items.find((item) => item.id === id); // Encontra o cliente pelo ID

    if (!ordemservico) {
      return null; // Se o ordemservico não for encontrado, retorna null
    }

    const veiculo = this.veiculos.find(
      (item) => item.id === ordemservico.veiculoId
    ); // Encontra o veiculo pelo ID
    const cliente = this.clientes.find(
      (item) => item.id === ordemservico.clienteId
    );

    return {
      id: ordemservico.id,
      cliente: cliente ?? ({} as Cliente), // Se o cliente não for encontrado, retorna um objeto vazio
      veiculo: veiculo ?? ({} as Veiculo), // Se o veiculo não for encontrado, retorna um objeto vazio
      km: ordemservico.km,
      status: ordemservico.status,
      valorTotal: ordemservico.valorTotal,
      desconto: ordemservico.desconto,
      createdAt: ordemservico.createdAt,
      updatedAt: ordemservico.updatedAt,
    };
    // Retorna o ordemservico encontrado ou null se não existir
  }

  async findMany(): Promise<OrdemServico[]> {
    // Busca todos os ordemservicos em memória
    return this.items;
  }

  async update(data: Prisma.OrdemServicoUncheckedUpdateInput) {
    // Atualiza um ordemservico em memória
    const index = this.items.findIndex((item) => item.id === data.id); // Encontra o índice da ordemServico pelo ID

    Object.assign(this.items[index], data); // Atualiza os dados do ordemservico encontrado

    return this.items[index]; // Retorna o ordemservico encontrado
  }
}
