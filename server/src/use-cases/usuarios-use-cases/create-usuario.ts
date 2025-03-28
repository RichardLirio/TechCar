import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../erros/usuario-ja-existe-erro";

interface createUserCaseParams {
  name: string;
  email: string;
  password: string;
}

interface createUserCaseResponse {
  usuario: Usuario;
}

export class CreateUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    name,
    email,
    password,
  }: createUserCaseParams): Promise<createUserCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usuarioRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const usuario = await this.usuarioRepository.create({
      name,
      email,
      password_hash,
    });

    return { usuario };
  }
}
