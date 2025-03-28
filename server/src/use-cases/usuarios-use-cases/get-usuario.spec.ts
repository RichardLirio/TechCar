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
  });

  it("Está sendo possivel buscar os dados de um usuario", async () => {
    const createdUser = await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { usuario } = await sut.execute({
      userId: createdUser.id,
    });

    expect(usuario.id).toEqual(expect.any(String));
    expect(usuario.name).toEqual("John Doe");
  });

  it("Não está sendo possivel buscar dados de um usuario com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
