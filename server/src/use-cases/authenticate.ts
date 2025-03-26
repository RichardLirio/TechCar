import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { compare } from "bcryptjs";
import { CredenciaisUsuarioInvalidaError } from "./erros/credencias-usuario-invalidas";

interface AuthenticateUseCaseParams {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  usuario: Usuario;
}

export class AuthenticateUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResponse> {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new CredenciaisUsuarioInvalidaError();
    }

    const passwordBateu = await compare(password, usuario.password_hash);

    if (!passwordBateu) {
      throw new CredenciaisUsuarioInvalidaError();
    }

    return { usuario };
  }
}
