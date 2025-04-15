import { ServicoRepository } from "@/repositories/servico-repository";
import { CreateServicoUseCase } from "./create-servico";
import { InMemoryServicoRepository } from "@/repositories/in-memory/in-memory-servico-repository";
import { ServicoAlreadyExistsError } from "../erros/servico-ja-existe-erro";

let servicoRepository: ServicoRepository;
let sut: CreateServicoUseCase;

describe("Create Servico Use Case", () => {
  beforeEach(() => {
    servicoRepository = new InMemoryServicoRepository();
    sut = new CreateServicoUseCase(servicoRepository);
  });
  // Testes do caso de uso de criação de servico
  it("Está sendo possivel cadastrar um novo servico", async () => {
    const { servico } = await sut.execute({
      descricao: "Servico Teste",
      valorServico: 100,
    }); // Cria um novo servico para testar a criação

    expect(servico.descricao).toEqual("SERVICO TESTE");
    expect(servico.valorServico).toEqual(100);
  }); // Verifica se O nome do servico foi formatado corretamente

  it("Não deverá ser possivel criar um servico com o mesmo nome", async () => {
    await servicoRepository.create({
      descricao: "SERVICO TESTE",
      valorServico: 100,
    });

    await expect(() =>
      sut.execute({
        descricao: "Servico Teste",
        valorServico: 100,
      })
    ).rejects.toBeInstanceOf(ServicoAlreadyExistsError); // // Verifica se o erro retornado é do tipo ServicoAlreadyExistsError
  });
});
