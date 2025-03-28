import { UsuarioRepository } from "@/repositories/usuario-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { GetUserUseCase } from "./get-usuario";
import { GetAllUsersUseCase } from "./get-todos-usuarios";

let usuarioRepository: UsuarioRepository;
let sut: GetAllUsersUseCase;

describe("Get todos Usuarios Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new GetAllUsersUseCase(usuarioRepository);
  });

  it("Está sendo possivel buscar uma lista que contem dados de usuarios", async () => {
    await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await usuarioRepository.create({
      name: "Jose Silva",
      email: "jose@example.com",
      password_hash: await hash("123456", 6),
    });

    const { usuarios } = await sut.execute();

    expect(usuarios).toHaveLength(2);
    expect(usuarios).toEqual([
      expect.objectContaining({ name: "John Doe" }),
      expect.objectContaining({ name: "Jose Silva" }),
    ]);
  });

  it("Está sendo possivel buscar uma lista vazia que não contem dados de usuarios", async () => {
    const { usuarios } = await sut.execute();

    expect(usuarios).toHaveLength(0);
  });
});
