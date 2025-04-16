import { beforeEach, describe, expect, it } from "vitest";
import { ServicoRepository } from "@/repositories/servico-repository";
import { InMemoryServicoRepository } from "@/repositories/in-memory/in-memory-servico-repository";
import { GetAllServicosUseCase } from "./get-todos-servicos";

let servicoRepository: ServicoRepository;
let sut: GetAllServicosUseCase;
describe("Get todos Servicos Use Case", () => {
  beforeEach(() => {
    servicoRepository = new InMemoryServicoRepository();
    sut = new GetAllServicosUseCase(servicoRepository);
  }); // Cria uma nova instância do repositório de servicos e do caso de uso antes de cada teste

  // Testes do caso de uso de busca de todos os servicos
  it("Está sendo possivel buscar uma lista que contem dados de todos os servicos", async () => {
    // Cria dois servicos para testar a busca
    await servicoRepository.create({
      descricao: "servico teste",
      valorServico: 100,
    });
    // Cria o segundo cliente
    await servicoRepository.create({
      descricao: "servico teste 2",
      valorServico: 99,
    });
    // Executa o caso de uso para buscar todos os clientes
    const { servicos } = await sut.execute();

    // Verifica se a lista de servicos retornada tem o tamanho correto e contém os servicos criados
    expect(servicos).toHaveLength(2);
    expect(servicos).toEqual([
      expect.objectContaining({ id: 1, descricao: "SERVICO TESTE" }),
      expect.objectContaining({ id: 2, descricao: "SERVICO TESTE 2" }),
    ]);
  });

  // Testa se a lista de servicos retornada está vazia quando não há servicos cadastrados
  it("Está sendo possivel buscar uma lista vazia que não contem dados de servicos", async () => {
    const { servicos } = await sut.execute();

    expect(servicos).toHaveLength(0);
  });
});
