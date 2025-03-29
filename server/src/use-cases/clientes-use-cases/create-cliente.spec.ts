import { beforeEach, describe, expect, it } from "vitest";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "../erros/cpfCnpj-invalido";
import { CreateClienteUseCase } from "./create-cliente";

let clientRepository: ClienteRepository;
let sut: CreateClienteUseCase;

describe("Create Client Use Case", () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    sut = new CreateClienteUseCase(clientRepository);
  });
  // Testes do caso de uso de criação de cliente
  it("Está sendo possivel cadastrar um novo cliente com cpf valido", async () => {
    const { cliente } = await sut.execute({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    }); // Cria um novo cliente para testar a criação

    expect(cliente.cpfCnpj).toEqual("70678230056");
  }); // Verifica se o CPF do cliente foi formatado corretamente

  it("Está sendo possivel cadastrar um novo cliente com cnpj valido", async () => {
    const { cliente } = await sut.execute({
      nome: "John Doe",
      cpfCnpj: "30.802.836/0001-70",
      telefone: "27997036211",
      tipo: "JURIDICA",
    }); // Cria um novo cliente para testar a criação

    expect(cliente.cpfCnpj).toEqual("30802836000170"); // Verifica se o CNPJ do cliente foi formatado corretamente
  });

  it("Não deverá ser possivel criar um cliente com mesmo cpfCnpj", async () => {
    await sut.execute({
      nome: "John Doe",
      cpfCnpj: "30.802.836/0001-70",
      telefone: "27997036211",
      tipo: "JURIDICA",
    }); // // Cria um novo cliente para testar a criação

    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "30.802.836/0001-70",
        telefone: "27997036211",
        tipo: "JURIDICA",
      })
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError); // // Verifica se o erro retornado é do tipo ClientAlreadyExistsError
  });

  it("Não deverá ser possivel cadastrar um novo cliente com cpf ou cnpj invalido", async () => {
    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "123456166-21",
        telefone: "27997036211",
        tipo: "JURIDICA",
      })
    ).rejects.toBeInstanceOf(CpfCnpjInvalidError); // // Verifica se o erro retornado é do tipo CpfCnpjInvalidError
  });

  it("Não deverá ser possivel cadastrar um novo cliente com cpf ou cpf invalido", async () => {
    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "123456166-21",
        telefone: "27997036211",
      })
    ).rejects.toBeInstanceOf(CpfCnpjInvalidError); // // // Verifica se o erro retornado é do tipo CpfCnpjInvalidError
  });
});
