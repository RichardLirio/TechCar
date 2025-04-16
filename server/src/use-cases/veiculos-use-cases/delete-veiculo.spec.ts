import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { DeleteVeiculoUseCase } from "./delete-veiculo";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";

let veiculoRepository: VeiculoRepository;
let clienteRepository: ClienteRepository;
let sut: DeleteVeiculoUseCase;

describe("Delete Veiculo Use Case", () => {
  beforeEach(() => {
    veiculoRepository = new InMemoryVeiculoRepository();
    clienteRepository = new InMemoryClientRepository();
    sut = new DeleteVeiculoUseCase(veiculoRepository);
  });

  // Testes do caso de uso de exclusão de veiculo
  it("Está sendo possivel excluir um veiculo", async () => {
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    });

    const createdVeiculo = await veiculoRepository.create({
      clienteId: 1,
      placa: "Ppw-1595",
      marca: "Fiat",
      modelo: "Argo",
      ano: 2013,
    }); // Cria um novo veiculo com a id do usuario anterior

    await sut.execute({
      veiculoId: createdVeiculo.id,
    });

    const veiculo = await veiculoRepository.findById(createdVeiculo.id);

    expect(veiculo).toBeNull();
  });
  // Testa se o veiculo não pode ser excluído com um id incorreto
  it("Não está sendo possivel deletar um veiculo com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        veiculoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
