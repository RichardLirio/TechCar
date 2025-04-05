import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { DeleteProdutoUseCase } from "./delete-produto";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";

let produtoRepository: ProdutoRepository;
let sut: DeleteProdutoUseCase;

describe("Delete Produto Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    sut = new DeleteProdutoUseCase(produtoRepository);
  });

  // Testes do caso de uso de exclusão de produto
  it("Está sendo possivel excluir um produto", async () => {
    const createdProduto = await produtoRepository.create({
      nome: "PRODUTO TESTE",
      quantidade: 10,
      valorUnitario: 100,
    });

    await sut.execute({
      produtoId: createdProduto.id,
    });

    const produto = await produtoRepository.findById(createdProduto.id);

    expect(produto).toBeNull();
  });
  // Testa se o produto não pode ser excluído com um id incorreto
  it("Não está sendo possivel deletar um produto com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        produtoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
