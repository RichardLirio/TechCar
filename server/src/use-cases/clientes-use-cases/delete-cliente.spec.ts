import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { DeleteClienteUseCase } from "../veiculos-use-cases/delete-veiculo";

let clienteRepository: ClienteRepository;
let sut: DeleteClienteUseCase;

describe("Delete Cliente Use Case", () => {
  beforeEach(() => {
    clienteRepository = new InMemoryClientRepository();
    sut = new DeleteClienteUseCase(clienteRepository);
  });

  // Testes do caso de uso de exclusão de usuário
  it("Está sendo possivel excluir um cliente", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "12345678901",
      telefone: "2799991234",
      tipo: "FISICA",
    });

    await sut.execute({
      clienteId: createdCliente.id,
    });

    const cliente = await clienteRepository.findById(createdCliente.id);

    expect(cliente).toBeNull();
  });
  // Testa se o usuário não pode ser excluído com um id incorreto
  it("Não está sendo possivel deletar um cliente com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        clienteId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
