import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { UpdateClienteUseCase } from "./update-cliente";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";

let clienteRepository: ClienteRepository;
let sut: UpdateClienteUseCase;

describe("Update Cliente Use Case", () => {
  beforeEach(() => {
    clienteRepository = new InMemoryClientRepository();
    sut = new UpdateClienteUseCase(clienteRepository);
  }); // Cria uma nova instância do repositório de cliente e do caso de uso antes de cada teste

  it("Está sendo possivel atualizar um cliente", async () => {
    const createdClient = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a atualização

    const { cliente } = await sut.execute({
      id: createdClient.id,
      nome: "John Silva",
      cpfCnpj: "706.782.300-56",
      telefone: "27998543212",
    }); // Executa o caso de uso para atualizar o cliente criado

    expect(cliente.nome).toEqual("John Silva"); // Verifica se o nome do cliente foi atualizado corretamente
    expect(cliente.telefone).toEqual("27998543212"); // Verifica se o telefone foi alterado corretamente
  });

  it("Não está sendo possivel atualizar um cliente com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        id: 0,
        nome: "John Silva",
        cpfCnpj: "706.782.300-56",
        telefone: "27998543212",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não está sendo possivel atualizar um cliente com um cpfCnpf que ja existe", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a atualização

    await clienteRepository.create({
      nome: "Joao Silva",
      cpfCnpj: "648.748.080-00",
      telefone: "21998764567",
    }); // Cria um segundo cliente com o mesmo email para testar a atualização

    await expect(() =>
      sut.execute({
        id: createdCliente.id,
        nome: "John Doe",
        cpfCnpj: "648.748.080-00",
        telefone: "27997036211",
      })
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError); // Verifica se o erro retornado é do tipo UserAlreadyExistsError
  });
});
