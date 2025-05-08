import { beforeEach, describe, expect, it } from "vitest";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { InMemoryOrdemServicoRepository } from "@/repositories/in-memory/in-memory-ordem-servico-repository";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { VeiculoEClienteError } from "../erros/veiculo-cliente-erro";
import { CreateOrdemItemProdutoUseCase } from "./create-ordem-item-produto";
import { OrdemItemProdutoRepository } from "@/repositories/ordem-item-produtos-repository";
import { InMemoryOrdemItemProdutoRepository } from "@/repositories/in-memory/in-memory-ordem-item-produtos-repository";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { InMemoryProdutoRepository } from "@/repositories/in-memory/in-memory-produto-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { ProdutoComEstoqueInsuficienteError } from "../erros/produto-com-estoque-insuficiente-erro";

let ordemServicoRepository: OrdemServicoRepository;
let ordemItemProdutoRepository: OrdemItemProdutoRepository;
let produtoRepository: ProdutoRepository;
let clienteRepository: ClienteRepository;
let veiculoRepository: VeiculoRepository;
let sut: CreateOrdemItemProdutoUseCase;

describe("Create Ordem de Servico Use Case", () => {
  beforeEach(() => {
    ordemServicoRepository = new InMemoryOrdemServicoRepository();
    produtoRepository = new InMemoryProdutoRepository();
    ordemItemProdutoRepository = new InMemoryOrdemItemProdutoRepository();
    clienteRepository = new InMemoryClientRepository();
    veiculoRepository = new InMemoryVeiculoRepository();

    sut = new CreateOrdemItemProdutoUseCase(
      ordemItemProdutoRepository,
      produtoRepository,
      ordemServicoRepository
    ); // Cria uma nova instância do caso de uso antes de cada teste
  });

  it("Está sendo possivel cadastrar um novo item de produto na ordem de serviço", async () => {
    const createdOrdemServico = await ordemServicoRepository.create({
      clienteId: 1,
      veiculoId: 1,
      km: 1000,
      desconto: 0,
      valorTotal: 0,
      status: "ABERTA",
    });

    const createdProduto = await produtoRepository.create({
      nome: "Produto teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo produto para testar a criação

    const { ordemItemProduto } = await sut.execute({
      ordemId: createdOrdemServico.id,
      produtoId: createdProduto.id,
      quantidadeUsada: 5,
      valorUnitarioPeca: 100,
    }); // Cria uma nova ordem de serviço para testar a criação

    expect(ordemItemProduto.id).toEqual(1);
    expect(ordemItemProduto.quantidadeUsada).toEqual(5); // Verifica se a quilometragem da ordem de serviço foi criada corretamente
    expect(ordemItemProduto.valorUnitarioPeca).toEqual(100); // Verifica se o status da ordem de serviço foi criado corretamente
  }); // Verifica se o CPF do ordemservico foi formatado corretamente

  it("Não deverá ser possivel criar um item de produto com o id da ordem de serviço incorreto", async () => {
    await expect(() =>
      sut.execute({
        ordemId: 0,
        produtoId: 1,
        quantidadeUsada: 5,
        valorUnitarioPeca: 100,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não deverá ser possivel criar um item de produto com o id de produto incorreto", async () => {
    await expect(() =>
      sut.execute({
        ordemId: 1,
        produtoId: 0,
        quantidadeUsada: 5,
        valorUnitarioPeca: 100,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ProdutoComEstoqueInsuficienteError
  });

  it("Não deverá ser possivel criar um item de produto com produto com quantidade acima do estoque", async () => {
    const createdOrdemServico = await ordemServicoRepository.create({
      clienteId: 1,
      veiculoId: 1,
      km: 1000,
      desconto: 0,
      valorTotal: 0,
      status: "ABERTA",
    });

    const createdProduto = await produtoRepository.create({
      nome: "Produto teste",
      quantidade: 10,
      valorUnitario: 100,
    }); // Cria um novo produto para testar a criação

    await expect(() =>
      sut.execute({
        ordemId: createdOrdemServico.id,
        produtoId: createdProduto.id,
        quantidadeUsada: 11,
        valorUnitarioPeca: 100,
      })
    ).rejects.toBeInstanceOf(ProdutoComEstoqueInsuficienteError); // // Verifica se o erro retornado é do tipo ProdutoComEstoqueInsuficienteError
  });
});
