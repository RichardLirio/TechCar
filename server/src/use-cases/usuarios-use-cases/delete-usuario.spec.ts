import { UsuarioRepository } from "@/repositories/usuario-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-usuario-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { DeleteUserUseCase } from "./delete-usuario";

let usuarioRepository: UsuarioRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    usuarioRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usuarioRepository);
  });
  // Testes do caso de uso de exclusão de usuário
  it("Está sendo possivel excluir um usuario", async () => {
    const createdUser = await usuarioRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await sut.execute({
      userId: createdUser.id,
    });

    const usuario = await usuarioRepository.findById(createdUser.id);

    expect(usuario).toBeNull();
  });
  // Testa se o usuário não pode ser excluído com um id incorreto
  it("Não está sendo possivel deletar um usuario com um id incorreto", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
