import { UsuarioRepository } from "@/repositories/usuario-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { UpdateUserUseCase } from "./update-usuario-use-case";
import { UserAlreadyExistsError } from "../erros/usuario-ja-existe-erro";

let usuarioRepository: UsuarioRepository;
let sut: UpdateUserUseCase;

describe("Update User Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usuarioRepository);
  }); // Cria uma nova instância do repositório de usuários e do caso de uso antes de cada teste

  it("Está sendo possivel atualizar um usuario", async () => {
    const createdUser = await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    }); // Cria um novo usuário para testar a atualização

    const { usuario } = await sut.execute({
      id: createdUser.id,
      name: "John Silva",
      email: "johnSilva@example.com",
      password: "hfudsi075",
      role: "ADMIN",
    }); // Executa o caso de uso para atualizar o usuário criado

    expect(usuario.name).toEqual("John Silva"); // Verifica se o nome do usuário foi atualizado corretamente
    expect(usuario.role).toEqual("ADMIN"); // Verifica se o nome e o papel do usuário foram atualizados corretamente
  });

  it("Não está sendo possivel atualizar um usuario com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
        name: "John Silva",
        email: "johnSilva@example.com",
        password: "hfudsi075",
        role: "ADMIN",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError); // Verifica se o erro retornado é do tipo ResourceNotFoundError
  });

  it("Não está sendo possivel atualizar um usuario com um email que ja existe", async () => {
    const createdUser = await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    }); // Cria um novo usuário para testar a atualização

    await usuarioRepository.create({
      name: "Joao Silva",
      email: "joaosilva@example.com",
      password_hash: await hash("123456", 6),
    }); // Cria um segundo usuário com o mesmo email para testar a atualização

    await expect(() =>
      sut.execute({
        id: createdUser.id,
        name: "John Doe",
        email: "joaosilva@example.com",
        password: "hfudsi075",
        role: "ADMIN",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError); // Verifica se o erro retornado é do tipo UserAlreadyExistsError
  });
});
