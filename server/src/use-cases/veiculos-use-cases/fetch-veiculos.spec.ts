import { beforeEach, describe, expect, it } from "vitest";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { GetAllVeiculosUseCase } from "./fetch-veiculos";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";

let veiculoRepository: VeiculoRepository;
let sut: GetAllVeiculosUseCase;
let clienteRepository: ClienteRepository;

describe("Get todos Veiculos Use Case", () => {
  beforeEach(() => {
    veiculoRepository = new InMemoryVeiculoRepository();
    clienteRepository = new InMemoryClientRepository();
    sut = new GetAllVeiculosUseCase(veiculoRepository);
  }); // Cria uma nova instância do repositório de veiculos e do caso de uso antes de cada teste

  // Testes do caso de uso de busca de todos os veiculos
  it("Está sendo possivel buscar uma lista que contem dados de todos os veiculos", async () => {
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    }); // Cria um novo cliente para o veiculo que será buscado

    await veiculoRepository.create({
      clienteId: 1,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    await veiculoRepository.create({
      clienteId: 1,
      placa: "OYG-1022",
      marca: "Mercedes",
      modelo: "1635",
      ano: 2023,
    }); // Cria um novo veiculo com a id do usuario anterior

    const { veiculos } = await sut.execute();

    // Verifica se a lista de veiculos retornada tem o tamanho correto e contém os veiculos criados
    expect(veiculos).toHaveLength(2);
    expect(veiculos).toEqual([
      expect.objectContaining({ placa: "PPW1595" }),
      expect.objectContaining({ placa: "OYG1022" }),
    ]);
  });

  // Testa se a lista de veiculos retornada está vazia quando não há veiculos cadastrados
  it("Está sendo possivel buscar uma lista vazia que não contem dados de veiculos", async () => {
    const { veiculos } = await sut.execute();

    expect(veiculos).toHaveLength(0);
  });
});
