import { ProdutoRepository } from "@/repositories/produto-repository";
import { CreateProdutoUseCase } from "./create-produto";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";
import { ProdutoAlreadyExistsError } from "../erros/produto-ja-existe-erro";

let produtoRepository: ProdutoRepository;
let sut: CreateProdutoUseCase;

describe("Create Produto Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    sut = new CreateProdutoUseCase(produtoRepository);
  });
  // Testes do caso de uso de criação de produto
  it("Está sendo possivel cadastrar um novo produto", async () => {
    const { produto } = await sut.execute({
      nome: "Produto Teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo produto para testar a criação

    expect(produto.nome).toEqual("PRODUTO TESTE");
    expect(produto.quantidade).toEqual(10);
  }); // Verifica se O nome do produto foi formatado corretamente

  it("Não deverá ser possivel criar um produto com o mesmo nome", async () => {
    await produtoRepository.create({
      nome: "PRODUTO TESTE",
      quantidade: 10,
      valorUnitario: 100,
    });

    await expect(() =>
      sut.execute({
        nome: "Produto Teste",
        quantidade: 10,
        valorUnitario: 100,
      })
    ).rejects.toBeInstanceOf(ProdutoAlreadyExistsError); // // Verifica se o erro retornado é do tipo ProdutoAlreadyExistsError
  });
});
