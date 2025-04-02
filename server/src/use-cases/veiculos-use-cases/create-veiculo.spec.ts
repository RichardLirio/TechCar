import { beforeEach, describe, expect, it } from "vitest";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { CreateVeiculoUseCase } from "./create-veiculos";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { VeiculoAlreadyExistsError } from "../erros/veiculo-ja-existe-erro";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

let veiculoRepository: VeiculoRepository;
let clienteRepository: ClienteRepository;
let sut: CreateVeiculoUseCase;

describe("Create Veiculo Use Case", () => {
  beforeEach(() => {
    veiculoRepository = new InMemoryVeiculoRepository();
    clienteRepository = new InMemoryClientRepository();
    sut = new CreateVeiculoUseCase(veiculoRepository, clienteRepository);
  });
  // Testes do caso de uso de criação de veiculo
  it("Está sendo possivel cadastrar um novo veiculo", async () => {
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    });

    const { veiculo } = await sut.execute({
      clienteId: 1,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo para testar a criação

    expect(veiculo.placa).toEqual("PPW1595");
  }); // Verifica se a placa do veiculo foi formatado corretamente

  it("Não deverá ser possivel criar um veiculo com a mesma placa", async () => {
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    });

    await sut.execute({
      clienteId: 1,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // // Cria um novo veiculo para testar a criação

    await expect(() =>
      sut.execute({
        clienteId: 1,
        placa: "Ppw-1595",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2013,
      })
    ).rejects.toBeInstanceOf(VeiculoAlreadyExistsError); // // Verifica se o erro retornado é do tipo VeiculoAlreadyExistsError
  });

  it("Não deverá ser possivel criar um veiculo informando um id de cliente invalido", async () => {
    await expect(() =>
      sut.execute({
        clienteId: 1,
        placa: "Ppw-1595",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2013,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
