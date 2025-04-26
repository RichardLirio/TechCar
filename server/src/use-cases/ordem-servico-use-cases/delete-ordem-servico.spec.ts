import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { InMemoryOrdemServicoRepository } from "@/repositories/in-memory/in-memory-ordem-servico-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { GetOrdemServicoUseCase } from "./get-ordem-servico";

let ordemServicoRepository: OrdemServicoRepository;
let clienteRepository: ClienteRepository;
let veiculoRepository: VeiculoRepository;
let sut: GetOrdemServicoUseCase;

describe("Delete Ordem de Servico Use Case", () => {
  beforeEach(() => {
    ordemServicoRepository = new InMemoryOrdemServicoRepository();
    clienteRepository = new InMemoryClientRepository();
    veiculoRepository = new InMemoryVeiculoRepository();
    sut = new GetOrdemServicoUseCase(ordemServicoRepository); // Cria uma nova instância do caso de uso antes de cada teste
  });
  // Testes do caso de uso de excluir ordemservico
  it("Está sendo possivel excluir uma Ordem de Servico", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "70678230056",
      telefone: "27997036211",
    }); // Cria um novo cliente para ser usado na ordem de serviço

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdCliente.id,
      marca: "Volkswagen",
      modelo: "Fusca",
      placa: "ABC-1234",
      ano: 1970,
    }); // Cria um novo veículo para ser usado na ordem de serviço

    const ordemServicoCreated = await ordemServicoRepository.create({
      clienteId: createdCliente.id,
      veiculoId: createdVeiculo.id,
      km: 1000,
      desconto: 0,
      valorTotal: 0,
      status: "ABERTA",
    }); // Cria uma nova ordem de serviço para testar a criação

    const { ordemServico } = await sut.execute({
      ordemServicoId: ordemServicoCreated.id,
    }); // Busca a ordem de serviço pelo ID

    expect(ordemServico.id).toEqual(1);
    expect(ordemServico.km).toEqual(1000); // Verifica se a quilometragem da ordem de serviço foi criada corretamente
    expect(ordemServico.status).toEqual("ABERTA"); // Verifica se o status da ordem de serviço foi criado corretamente
  }); // Verifica se o CPF do ordemservico foi formatado corretamente

  it("Não deverá ser possivel excluir uma ordem de servico com id invalido", async () => {
    await expect(() =>
      sut.execute({
        ordemServicoId: 0,
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
