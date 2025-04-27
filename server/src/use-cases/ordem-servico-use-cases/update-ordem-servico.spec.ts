import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { UpdateOrdemServicoUseCase } from "./update-ordem-servico";
import { InMemoryOrdemServicoRepository } from "@/repositories/in-memory/in-memory-ordem-servico-repository";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { VeiculoRepository } from "@/repositories/veiculo-repository";
import { InMemoryVeiculoRepository } from "@/repositories/in-memory/in-memory-veiculo-repository";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { VeiculoEClienteError } from "../erros/veiculo-cliente-erro";

let ordemServicoRepository: OrdemServicoRepository;
let clienteRepository: ClienteRepository;
let veiculoRepository: VeiculoRepository;
let sut: UpdateOrdemServicoUseCase;

describe("Update Ordem de Servico Use Case", () => {
  beforeEach(async () => {
    ordemServicoRepository = new InMemoryOrdemServicoRepository();
    clienteRepository = new InMemoryClientRepository();
    veiculoRepository = new InMemoryVeiculoRepository();
    sut = new UpdateOrdemServicoUseCase(
      ordemServicoRepository,
      clienteRepository,
      veiculoRepository
    ); // Cria uma nova instância do caso de uso antes de cada teste
  });

  // Testes do caso de uso de criação de ordemservico
  it("Está sendo possivel atualizar uma nova Ordem de Servico", async () => {
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
      id: ordemServicoCreated.id,
      clienteId: createdCliente.id,
      veiculoId: createdVeiculo.id,
      km: 99,
      desconto: 0,
      valorTotal: 0,
      status: "FECHADA",
    }); // Cria uma nova ordem de serviço para testar a criação

    expect(ordemServico.km).toEqual(99); // Verifica se a quilometragem da ordem de serviço foi criada corretamente
    expect(ordemServico.status).toEqual("FECHADA"); // Verifica se o status da ordem de serviço foi criado corretamente
  }); // Verifica se o CPF do ordemservico foi formatado corretamente

  it("Não deverá ser possivel atualizar uma ordem de servico com cliente invalido", async () => {
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

    await expect(() =>
      sut.execute({
        id: ordemServicoCreated.id,
        clienteId: createdCliente.id + 1,
        veiculoId: createdVeiculo.id,
        km: 1000,
        desconto: 0,
        valorTotal: 0,
        status: "ABERTA",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não deverá ser possivel atualizar uma nova ordem de servico com veiculo invalido", async () => {
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

    await expect(() =>
      sut.execute({
        id: ordemServicoCreated.id,
        clienteId: createdCliente.id,
        veiculoId: createdVeiculo.id + 1,
        km: 1000,
        desconto: 0,
        valorTotal: 0,
        status: "ABERTA",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não deverá ser possivel cadastrar uma nova ordem de servico com veiculo que não pertence ao cliente", async () => {
    const createdCliente = await clienteRepository.create({
      nome: "John Doe",
      cpfCnpj: "70678230056",
      telefone: "27997036211",
    }); // Cria um novo cliente para ser usado na ordem de serviço

    const createdCliente2 = await clienteRepository.create({
      nome: "John Doe 2",
      cpfCnpj: "70678230056",
      telefone: "27997036211",
    }); // Cria um novo cliente para ser usado na ordem de serviço

    const createdVeiculo = await veiculoRepository.create({
      clienteId: createdCliente2.id,
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

    await expect(() =>
      sut.execute({
        id: ordemServicoCreated.id,
        clienteId: createdCliente.id,
        veiculoId: createdVeiculo.id,
        km: 1000,
        desconto: 0,
        valorTotal: 0,
        status: "ABERTA",
      })
    ).rejects.toBeInstanceOf(VeiculoEClienteError); // // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
