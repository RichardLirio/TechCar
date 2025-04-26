import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { InMemoryOrdemServicoRepository } from "@/repositories/in-memory/in-memory-ordem-servico-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { FetchOrdensServicosUseCase } from "./fetch-ordens-servicos";

let ordemServicoRepository: OrdemServicoRepository;
let clienteRepository: ClienteRepository;
let veiculoRepository: VeiculoRepository;
let sut: FetchOrdensServicosUseCase;

describe("Fetch Ordens de Servico Use Case", () => {
  beforeEach(() => {
    ordemServicoRepository = new InMemoryOrdemServicoRepository();
    clienteRepository = new InMemoryClientRepository();
    veiculoRepository = new InMemoryVeiculoRepository();
    sut = new FetchOrdensServicosUseCase(ordemServicoRepository); // Cria uma nova instância do caso de uso antes de cada teste
  });

  it("Está sendo possivel buscar todas Ordens de Servicos", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "70678230056",
      telefone: "27997036211",
    }); // Cria um novo cliente para ser usado na ordem de serviço

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdCliente.id,
      marca: "Volkswagen",
      modelo: "Fusca",
      placa: "ABC-1234",
      ano: 1970,
    }); // Cria um novo veículo para ser usado na ordem de serviço

    await ordemServicoRepository.create({
      clienteId: createdCliente.id,
      veiculoId: createdVeiculo.id,
      km: 1000,
      desconto: 0,
      valorTotal: 0,
      status: "ABERTA",
    }); // Cria uma nova ordem de serviço para testar a criação

    await ordemServicoRepository.create({
      clienteId: createdCliente.id,
      veiculoId: createdVeiculo.id,
      km: 2500,
      desconto: 0,
      valorTotal: 99,
      status: "ABERTA",
    }); // Cria uma nova ordem de serviço para testar a criação

    const { ordensServicos } = await sut.execute(); // Executa o caso de uso para buscar todas as ordens de serviço

    expect(ordensServicos).toHaveLength(2);
    expect(ordensServicos).toEqual([
      expect.objectContaining({ km: 1000 }), // Verifica se a lista de ordens de serviço retornada tem o tamanho correto e contém as ordens de serviço criadas
      expect.objectContaining({ km: 2500 }), // Verifica se a lista de ordens de serviço retornada tem o tamanho correto e contém as ordens de serviço criadas
    ]);
  });

  // Testa se a lista de ordens de serviço retornada está vazia quando não há ordens de serviço cadastradas
  it("Está sendo possivel buscar uma lista vazia que não contem dados de ordens de servico", async () => {
    const { ordensServicos } = await sut.execute();

    expect(ordensServicos).toHaveLength(0); // Verifica se a lista de ordens de serviço retornada está vazia quando não há ordens de serviço cadastradas
  });
});
