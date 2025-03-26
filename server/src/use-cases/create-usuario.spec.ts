import { UsuarioRepository } from "@/repositories/usuario-repository";
import { CreateUserUseCase } from "./create-usuario";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/usuario-ja-existe-erro";

let usuarioRepository: UsuarioRepository;
let sut: CreateUserUseCase;

describe("Create Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usuarioRepository);
  });

  it("Está sendo possivel cadastrar um usuario", async () => {
    const { usuario } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(usuario.id).toEqual(expect.any(String));
  });

  it("Está sendo feito o hash do password", async () => {
    const { usuario } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      usuario.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Não deverá ser possivel criar um usuario com mesmo email", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email: email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
