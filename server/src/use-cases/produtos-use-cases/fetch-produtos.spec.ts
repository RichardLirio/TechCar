import { beforeEach, describe, expect, it } from "vitest";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";
import { GetAllProdutosUseCase } from "./fetch-produtos";

let produtoRepository: ProdutoRepository;
let sut: GetAllProdutosUseCase;
describe("Get todos Produtos Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    sut = new GetAllProdutosUseCase(produtoRepository);
  }); // Cria uma nova instância do repositório de produtos e do caso de uso antes de cada teste

  // Testes do caso de uso de busca de todos os produtos
  it("Está sendo possivel buscar uma lista que contem dados de todos os produtos", async () => {
    // Cria dois produtos para testar a busca
    await produtoRepository.create({
      nome: "produto teste",
      quantidade: 10,
      valorUnitario: 100,
    });
    // Cria o segundo cliente
    await produtoRepository.create({
      nome: "produto teste 2",
      quantidade: 10,
      valorUnitario: 20.53,
    });
    // Executa o caso de uso para buscar todos os clientes
    const { produtos } = await sut.execute();

    // Verifica se a lista de produtos retornada tem o tamanho correto e contém os produtos criados
    expect(produtos).toHaveLength(2);
    expect(produtos).toEqual([
      expect.objectContaining({ id: 1, nome: "PRODUTO TESTE" }),
      expect.objectContaining({ id: 2, nome: "PRODUTO TESTE 2" }),
    ]);
  });

  // Testa se a lista de produtos retornada está vazia quando não há produtos cadastrados
  it("Está sendo possivel buscar uma lista vazia que não contem dados de produtos", async () => {
    const { produtos } = await sut.execute();

    expect(produtos).toHaveLength(0);
  });
});
