import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../erros/usuario-ja-existe-erro";

interface UpdateUserUseCaseParams {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER" | undefined;
}

interface UpdateUserUseCaseResponse {
  usuario: Usuario;
}

export class UpdateUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    role,
  }: UpdateUserUseCaseParams): Promise<UpdateUserUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userExists = await this.usuarioRepository.findById(id);

    if (!userExists) {
      throw new ResourceNotFoundError();
    }

    const userWithSameEmail = await this.usuarioRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id != id) {
      throw new UserAlreadyExistsError();
    }

    const usuario = await this.usuarioRepository.update({
      id,
      name,
      email,
      password_hash,
      role,
    });

    if (!usuario) {
      throw new ResourceNotFoundError();
    }

    return { usuario };
  }
}
