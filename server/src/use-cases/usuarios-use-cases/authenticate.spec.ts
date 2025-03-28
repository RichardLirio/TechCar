import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { AuthenticateUseCase } from "./authenticate";
import { CredenciaisUsuarioInvalidaError } from "../erros/credencias-usuario-invalidas";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase; //sut -> sistem under test variavel global para a principal variavel que vai ser testada

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Deve ser possivel se autenticar", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    }); //criação de uma usuario

    const { usuario } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    }); //solicito login com as credenciais que usei para criar um usuario

    expect(usuario.id).toEqual(expect.any(String)); //espero que retorne um id, mostrando que foi feito a autentição com sucesso
  });

  it("Não deve ser possivel se autenticar com email incorreto", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(CredenciaisUsuarioInvalidaError); //espero que quando eu informe alguma credencial incorreta de o erro especifico
  });

  it("Não deve ser possivel se autenticar com senha incorreta", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    }); //crio um usuario

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "1231233",
      })
    ).rejects.toBeInstanceOf(CredenciaisUsuarioInvalidaError); //espero que quando eu informe alguma credencial incorreta de o erro especifico
  });
});
