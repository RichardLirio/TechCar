import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ServicoRepository } from "@/repositories/servico-repository";
import { DeleteServicoUseCase } from "./delete-servico";
import { InMemoryServicoRepository } from "@/repositories/in-memory/in-memory-servico-repository";

let servicoRepository: ServicoRepository;
let sut: DeleteServicoUseCase;

describe("Delete Servico Use Case", () => {
  beforeEach(() => {
    servicoRepository = new InMemoryServicoRepository();
    sut = new DeleteServicoUseCase(servicoRepository);
  });

  // Testes do caso de uso de exclusão de servico
  it("Está sendo possivel excluir um servico", async () => {
    const createdServico = await servicoRepository.create({
      descricao: "SERVIÇO TESTE",
      valorServico: 100,
    });

    await sut.execute({
      servicoId: createdServico.id,
    });

    const servico = await servicoRepository.findById(createdServico.id);

    expect(servico).toBeNull();
  });
  // Testa se o servico não pode ser excluído com um id incorreto
  it("Não está sendo possivel deletar um servico com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        servicoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
