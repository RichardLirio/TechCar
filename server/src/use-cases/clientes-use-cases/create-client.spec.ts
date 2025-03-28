import { beforeEach, describe, expect, it } from "vitest";
import { ClientRepository } from "@/repositories/client-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "../erros/cpfCnpj-invalido";
import { CreateClientUseCase } from "./create-client";

let clientRepository: ClientRepository;
let sut: CreateClientUseCase;

describe("Create Client Use Case", () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    sut = new CreateClientUseCase(clientRepository);
  });

  it("Está sendo possivel cadastrar um novo cliente com cpf valido", async () => {
    const { client } = await sut.execute({
      nome: "John Doe",
      cpfCnpj: "706.782.300-56",
      telefone: "27997036211",
    });

    expect(client.cpfCnpj).toEqual("70678230056");
  });

  it("Está sendo possivel cadastrar um novo cliente com cnpj valido", async () => {
    const { client } = await sut.execute({
      nome: "John Doe",
      cpfCnpj: "30.802.836/0001-70",
      telefone: "27997036211",
      tipo: "JURIDICA",
    });

    expect(client.cpfCnpj).toEqual("30802836000170");
  });

  it("Não deverá ser possivel criar um cliente com mesmo cpfCnpj", async () => {
    await sut.execute({
      nome: "John Doe",
      cpfCnpj: "30.802.836/0001-70",
      telefone: "27997036211",
      tipo: "JURIDICA",
    });

    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "30.802.836/0001-70",
        telefone: "27997036211",
        tipo: "JURIDICA",
      })
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError);
  });

  it("Não deverá ser possivel cadastrar um novo cliente com cpf ou cnpj invalido", async () => {
    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "123456166-21",
        telefone: "27997036211",
        tipo: "JURIDICA",
      })
    ).rejects.toBeInstanceOf(CpfCnpjInvalidError);
  });

  it("Não deverá ser possivel cadastrar um novo cliente com cpf ou cpf invalido", async () => {
    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpfCnpj: "123456166-21",
        telefone: "27997036211",
      })
    ).rejects.toBeInstanceOf(CpfCnpjInvalidError);
  });
});
