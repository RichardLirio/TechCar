import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { GetVeiculoUseCase } from "./get-veiculo";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";

let veiculoRepository: VeiculoRepository;
let clienteRepository: ClienteRepository;
let sut: GetVeiculoUseCase;

describe("Get Veiculo Use Case", () => {
  beforeEach(() => {
    veiculoRepository = new InMemoryVeiculoRepository();
    clienteRepository = new InMemoryClientRepository();
    sut = new GetVeiculoUseCase(veiculoRepository);
  }); // Cria uma nova instância do repositório de clientes e do caso de uso antes de cada teste

  it("Está sendo possivel buscar os dados de um veiculo", async () => {
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    }); // Cria um novo cliente para o veiculo que será buscado

    const createdVeiculo = await veiculoRepository.create({
      clienteId: 1,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    const { veiculo } = await sut.execute({ veiculoId: createdVeiculo.id }); //Busca o veiculo com base no id do veiculo criado

    expect(veiculo.id).toEqual(expect.any(Number)); // Verifica se o id do veiculo é um número
    expect(veiculo.placa).toEqual("PPW1595"); // Verifica se a plava do veiculo é o esperado
  });

  it("Não está sendo possivel buscar dados de um veiculo com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        veiculoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
