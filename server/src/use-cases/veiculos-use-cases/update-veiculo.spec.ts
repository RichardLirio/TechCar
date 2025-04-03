import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";
import { UpdateVeiculoUseCase } from "./update-veiculo";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { VeiculoAlreadyExistsError } from "../erros/veiculo-ja-existe-erro";

let veiculoRepository: VeiculoRepository;
let clienteRepository: ClienteRepository;
let sut: UpdateVeiculoUseCase;

describe("Update Veiculo Use Case", () => {
  beforeEach(() => {
    veiculoRepository = new InMemoryVeiculoRepository();
    clienteRepository = new InMemoryClientRepository();
    sut = new UpdateVeiculoUseCase(veiculoRepository, clienteRepository);
  }); // Cria uma nova instância do repositório de cliente e do caso de uso antes de cada teste

  it("Está sendo possivel atualizar um veiculo", async () => {
    const createdClient = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a atualização do veiculo

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdClient.id,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    const { veiculo } = await sut.execute({
      veiculoId: createdVeiculo.id,
      clienteId: 1,
      placa: "Ppw-1596",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo para testar a criação

    expect(veiculo.placa).toEqual("PPW1596"); // Verifica se a placa foi alteradacorretamente
  });

  it("Não está sendo possivel atualizar um veiculo com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        veiculoId: 0,
        clienteId: 1,
        placa: "Ppw-1596",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2013,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não está sendo possivel atualizar um veiculo com uma placa que ja existe", async () => {
    const createdClient = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a atualização do veiculo

    await veiculoRepository.create({
      clienteId: createdClient.id,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdClient.id,
      placa: "Ppw-1234",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    await expect(() =>
      sut.execute({
        veiculoId: createdVeiculo.id,
        clienteId: createdClient.id,
        placa: "Ppw-1595",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2013,
      })
    ).rejects.toBeInstanceOf(VeiculoAlreadyExistsError); // Verifica se o erro retornado é do tipo UserAlreadyExistsError
  });

  it("Não está sendo possivel atualizar um veiculo com um id de cliente incorreto", async () => {
    const createdClient = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a atualização do veiculo

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdClient.id,
      placa: "Ppw-1234",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    await expect(() =>
      sut.execute({
        veiculoId: createdVeiculo.id,
        clienteId: 0,
        placa: "Ppw-1234",
        marca: "Fiat",
        modelo: "Argo",
        ano: 2013,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
