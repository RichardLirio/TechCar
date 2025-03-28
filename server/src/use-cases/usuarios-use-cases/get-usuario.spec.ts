import { UsuarioRepository } from "@/repositories/usuario-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { GetUserUseCase } from "./get-usuario";

let usuarioRepository: UsuarioRepository;
let sut: GetUserUseCase;

describe("Get User Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new GetUserUseCase(usuarioRepository);
  }); // Cria uma nova instância do repositório de usuários e do caso de uso antes de cada teste

  it("Está sendo possivel buscar os dados de um usuario", async () => {
    const createdUser = await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    }); // Cria um novo usuário para testar a busca

    const { usuario } = await sut.execute({
      userId: createdUser.id,
    }); // Executa o caso de uso para buscar o usuário criado

    expect(usuario.id).toEqual(expect.any(String)); // Verifica se o id do usuário é uma string
    expect(usuario.name).toEqual("John Doe"); // Verifica se o nome do usuário é o esperado
  });

  it("Não está sendo possivel buscar dados de um usuario com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });
});
