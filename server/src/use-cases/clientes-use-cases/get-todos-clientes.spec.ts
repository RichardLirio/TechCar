import { beforeEach, describe, expect, it } from "vitest";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { GetAllClientesUseCase } from "./get-todos-clientes";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";

let clienteRepository: ClienteRepository;
let sut: GetAllClientesUseCase;
describe("Get todos Clientes Use Case", () => {
  beforeEach(() => {
    clienteRepository = new InMemoryClientRepository();
    sut = new GetAllClientesUseCase(clienteRepository);
  }); // Cria uma nova instância do repositório de clientes e do caso de uso antes de cada teste

  // Testes do caso de uso de busca de todos os clientes
  it("Está sendo possivel buscar uma lista que contem dados de todos os clientes", async () => {
    // Cria dois clientes para testar a busca
    await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    });
    // Cria o segundo cliente
    await clienteRepository.create({
      nome: "Jose Silva",
      cpfCnpj: "12345678902",
      telefone: "2799995678",
      tipo: "FISICA",
    });
    // Executa o caso de uso para buscar todos os clientes
    const { clientes } = await sut.execute();

    // Verifica se a lista de clientes retornada tem o tamanho correto e contém os clientes criados
    expect(clientes).toHaveLength(2);
    expect(clientes).toEqual([
      expect.objectContaining({ nome: "John Doe" }),
      expect.objectContaining({ nome: "Jose Silva" }),
    ]);
  });

  // Testa se a lista de clientes retornada está vazia quando não há clientes cadastrados
  it("Está sendo possivel buscar uma lista vazia que não contem dados de clientes", async () => {
    const { clientes } = await sut.execute();

    expect(clientes).toHaveLength(0);
  });
});
