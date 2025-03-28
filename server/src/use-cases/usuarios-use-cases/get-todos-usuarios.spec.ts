import { UsuarioRepository } from "@/repositories/usuario-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { hash } from "bcryptjs";
import { GetAllUsersUseCase } from "./get-todos-usuarios";

let usuarioRepository: UsuarioRepository;
let sut: GetAllUsersUseCase;
describe("Get todos Usuarios Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new GetAllUsersUseCase(usuarioRepository);
  }); // Cria uma nova instância do repositório de usuários e do caso de uso antes de cada teste

  // Testes do caso de uso de busca de todos os usuários
  it("Está sendo possivel buscar uma lista que contem dados de usuarios", async () => {
    // Cria dois usuários para testar a busca
    await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });
    // Cria o segundo usuário
    await usuarioRepository.create({
      name: "Jose Silva",
      email: "jose@example.com",
      password_hash: await hash("123456", 6),
    });
    // Executa o caso de uso para buscar todos os usuários
    const { usuarios } = await sut.execute();

    // Verifica se a lista de usuários retornada tem o tamanho correto e contém os usuários criados
    expect(usuarios).toHaveLength(2);
    expect(usuarios).toEqual([
      expect.objectContaining({ name: "John Doe" }),
      expect.objectContaining({ name: "Jose Silva" }),
    ]);
  });

  // Testa se a lista de usuários retornada está vazia quando não há usuários cadastrados
  it("Está sendo possivel buscar uma lista vazia que não contem dados de usuarios", async () => {
    const { usuarios } = await sut.execute();

    expect(usuarios).toHaveLength(0);
  });
});
