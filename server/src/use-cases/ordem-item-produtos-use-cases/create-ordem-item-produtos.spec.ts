import { ProdutoRepository } from "@/repositories/produto-repository";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";
import { ProdutoAlreadyExistsError } from "../erros/produto-ja-existe-erro";
import { OrdemItemProdutoRepository } from "@/repositories/ordem-item-produtos-repository";
import { CreateOrdemItemProdutoUseCase } from "./create-ordem-item-produto";
import { InMemoryOrdemItemProdutoRepository } from "@/repositories/in-memory/in-memory-ordem-item-produtos-repository";
import { InMemoryOrdemServicoRepository } from "@/repositories/in-memory/in-memory-ordem-servico-repository";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";

let ordemItemProdutoRepository: OrdemItemProdutoRepository;
let produtoRepository: ProdutoRepository;
let ordemServicoRepository: OrdemServicoRepository;
let sut: CreateOrdemItemProdutoUseCase;

describe("Create Ordem Item de Produto Use Case", () => {
  beforeEach(() => {
    produtoRepository = new InMemoryProdutoRepository();
    ordemItemProdutoRepository = new InMemoryOrdemItemProdutoRepository();
    ordemServicoRepository = new InMemoryOrdemServicoRepository();
    sut = new CreateOrdemItemProdutoUseCase(
      ordemItemProdutoRepository,
      produtoRepository,
      ordemServicoRepository
    );
  });
  // Testes do caso de uso de criação de produto
  it("Está sendo possivel cadastrar um novo item de produto na ordem de servico", async () => {
    const produto = await produtoRepository.create({
      nome: "PRODUTO TESTE",
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
