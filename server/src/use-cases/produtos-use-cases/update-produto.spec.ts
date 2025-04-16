import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { UpdateProdutoUseCase } from "./update-produto";
import { ProdutoAlreadyExistsError } from "../erros/produto-ja-existe-erro";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";

let produtoRepository: ProdutoRepository;
let sut: UpdateProdutoUseCase;

describe("Update Produto Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    sut = new UpdateProdutoUseCase(produtoRepository);
  }); // Cria uma nova instância do repositório de produto e do caso de uso antes de cada teste

  it("Está sendo possivel atualizar um produto", async () => {
    const createdProduto = await produtoRepository.create({
      nome: "Produto teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo produto para testar a atualização
    console.log("🚀 ~ it ~ produto:", createdProduto);

    const { produto } = await sut.execute({
      id: createdProduto.id,
      nome: "Produto teste atualizado",
      quantidade: 20,
      valorUnitario: 90,
    }); // Executa o caso de uso para atualizar o produto criado

    expect(produto.nome).toEqual("PRODUTO TESTE ATUALIZADO"); // Verifica se o nome do produto foi atualizado corretamente
    expect(produto.valorUnitario).toEqual(90); // Verifica se o valor unitário do produto foi atualizado corretamente
    expect(produto.quantidade).toEqual(20); // Verifica se a quantidade do produto foi atualizada corretamente
  });

  it("Não está sendo possivel atualizar um produto com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        id: 0,
        nome: "Produto teste",
        quantidade: 10,
        valorUnitario: 100,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não está sendo possivel atualizar um produto com um nome que ja existe", async () => {
    const createdProduto = await produtoRepository.create({
      nome: "Produto teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo produto para testar a atualização

    await produtoRepository.create({
      nome: "Produto teste atualizado",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um segundo produto com o mesmo email para testar a atualização

    await expect(() =>
      sut.execute({
        id: createdProduto.id,
        nome: "Produto teste atualizado",
        quantidade: 10,
        valorUnitario: 100,
      })
    ).rejects.toBeInstanceOf(ProdutoAlreadyExistsError); // Verifica se o erro retornado é do tipo UserAlreadyExistsError
  });
});
