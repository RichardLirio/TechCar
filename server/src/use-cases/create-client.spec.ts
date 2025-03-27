import { beforeEach, describe, expect, it } from "vitest";
import { ClientRepository } from "@/repositories/client-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { CreateClientUseCase } from "./create-client";
import { ClientAlreadyExistsError } from "./erros/cliente-ja-existe-erro";

let clientRepository: ClientRepository;
let sut: CreateClientUseCase;

describe("Create Client Use Case", () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    sut = new CreateClientUseCase(clientRepository);
  });

  it("Está sendo possivel cadastrar um novo cliente", async () => {
    const { client } = await sut.execute({
      nome: "John Doe",
      cpf: "123456166-21",
      telefone: "27997036211",
    });

    expect(client.cpf).toEqual("123456166-21");
  });

  it("Não deverá ser possivel criar um cliente com mesmo cpf", async () => {
    const cpf = "123456166-21";

    await sut.execute({
      nome: "John Doe",
      cpf: "123456166-21",
      telefone: "27997036211",
    });

    await expect(() =>
      sut.execute({
        nome: "John Doe",
        cpf: "123456166-21",
        telefone: "27997036211",
      })
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError);
  });
});
