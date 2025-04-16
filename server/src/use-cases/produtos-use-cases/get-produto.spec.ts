import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { GetProdutoUseCase } from "./get-produto";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";

let produtoRepository: ProdutoRepository;
let sut: GetProdutoUseCase;

describe("Get Produto Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    sut = new GetProdutoUseCase(produtoRepository);
  }); // Cria uma nova instância do repositório de clientes e do caso de uso antes de cada teste

  it("Está sendo possivel buscar os dados de um produto", async () => {
    const createdProduto = await produtoRepository.create({
      nome: "Produto teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo cliente para o produto que será buscado

    const { produto } = await sut.execute({ produtoId: createdProduto.id }); //Busca o produto com base no id do produto criado

    expect(produto.id).toEqual(expect.any(Number)); // Verifica se o id do produto é um número
    expect(produto.nome).toEqual("PRODUTO TESTE"); // Verifica se a plava do produto é o esperado
  });

  it("Não está sendo possivel buscar dados de um produto com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        produtoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
