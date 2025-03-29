import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { GetClienteUseCase } from "./get-cliente";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { number } from "zod";

let clienteRepository: ClienteRepository;
let sut: GetClienteUseCase;

describe("Get Cliente Use Case", () => {
  beforeEach(() => {
    clienteRepository = new InMemoryClientRepository();
    sut = new GetClienteUseCase(clienteRepository);
  }); // Cria uma nova instância do repositório de clientes e do caso de uso antes de cada teste

  it("Está sendo possivel buscar os dados de um cliente", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
      tipo: "FISICA",
    }); // Cria um novo cliente para testar a busca

    const { cliente } = await sut.execute({
      clienteId: String(createdCliente.id),
    }); // Executa o caso de uso para buscar o cliente criado

    expect(cliente.id).toEqual(expect.any(Number)); // Verifica se o id do cliente é um número
    expect(cliente.nome).toEqual("John Doe"); // Verifica se o nome do cliente é o esperado
  });

  it("Não está sendo possivel buscar dados de um cliente com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        clienteId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
