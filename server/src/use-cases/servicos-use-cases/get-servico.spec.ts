import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ServicoRepository } from "@/repositories/servico-repository";
import { GetServicoUseCase } from "./get-servico";
import { InMemoryServicoRepository } from "@/repositories/in-memory/in-memory-servico-repository";

let servicoRepository: ServicoRepository;
let sut: GetServicoUseCase;

describe("Get Servico Use Case", () => {
  beforeEach(() => {
    servicoRepository = new InMemoryServicoRepository();
    sut = new GetServicoUseCase(servicoRepository);
  }); // Cria uma nova instância do repositório de clientes e do caso de uso antes de cada teste

  it("Está sendo possivel buscar os dados de um servico", async () => {
    const createdServico = await servicoRepository.create({
      descricao: "Servico teste",
      valorServico: 100,
    }); // Cria um novo cliente para o servico que será buscado

    const { servico } = await sut.execute({ servicoId: createdServico.id }); //Busca o servico com base no id do servico criado

    expect(servico.id).toEqual(expect.any(Number)); // Verifica se o id do servico é um número
    expect(servico.descricao).toEqual("SERVICO TESTE"); // Verifica se a plava do servico é o esperado
  });

  it("Não está sendo possivel buscar dados de um servico com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        servicoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
