import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ServicoRepository } from "@/repositories/servico-repository";
import { UpdateServicoUseCase } from "./update-servico";
import { ServicoAlreadyExistsError } from "../erros/servico-ja-existe-erro";
import { InMemoryServicoRepository } from "@/repositories/in-memory/in-memory-servico-repository";

let servicoRepository: ServicoRepository;
let sut: UpdateServicoUseCase;

describe("Update Servico Use Case", () => {
  beforeEach(() => {
    servicoRepository = new InMemoryServicoRepository();
    sut = new UpdateServicoUseCase(servicoRepository);
  }); // Cria uma nova instância do repositório de servico e do caso de uso antes de cada teste

  it("Está sendo possivel atualizar um servico", async () => {
    const createdServico = await servicoRepository.create({
      descricao: "Servico teste",
      valorServico: 100,
    }); // Cria um novo servico para testar a atualização

    const { servico } = await sut.execute({
      id: createdServico.id,
      descricao: "Servico teste atualizado",
      valorServico: 99,
    }); // Executa o caso de uso para atualizar o servico criado

    expect(servico.descricao).toEqual("SERVICO TESTE ATUALIZADO"); // Verifica se o nome do servico foi atualizado corretamente
    expect(servico.valorServico).toEqual(99); // Verifica se o valor unitário do servico foi atualizado corretamente
  });

  it("Não está sendo possivel atualizar um servico com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        id: 0,
        descricao: "Servico teste atualizado",
        valorServico: 100,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não está sendo possivel atualizar um servico com um nome que ja existe", async () => {
    const createdServico = await servicoRepository.create({
      descricao: "Servico teste",
      valorServico: 100,
    }); // Cria um novo servico para testar a atualização

    await servicoRepository.create({
      descricao: "Servico teste atualizado",
      valorServico: 99,
    }); // Cria um segundo servico com o mesmo email para testar a atualização

    await expect(() =>
      sut.execute({
        id: createdServico.id,
        descricao: "Servico teste atualizado",
        valorServico: 99,
      })
    ).rejects.toBeInstanceOf(ServicoAlreadyExistsError); // Verifica se o erro retornado é do tipo UserAlreadyExistsError
  });
});
