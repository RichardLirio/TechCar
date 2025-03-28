import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { compare } from "bcryptjs";
import { CredenciaisUsuarioInvalidaError } from "../erros/credencias-usuario-invalidas";

/** Parametros para utilização do caso de uso*/
interface AuthenticateUseCaseParams {
  email: string;
  password: string;
}
/** Resposta do caso de uso */
interface AuthenticateUseCaseResponse {
  usuario: Usuario;
}

export class AuthenticateUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {} // inicia o repositório de usuários
  /** Método para autenticar o usuário */
  async execute({
    email,
    password,
  }: AuthenticateUseCaseParams): Promise<AuthenticateUseCaseResponse> {
    // Verifica se o usuário existe e se a senha está correta
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new CredenciaisUsuarioInvalidaError();
    }

    const passwordBateu = await compare(password, usuario.password_hash);

    if (!passwordBateu) {
      throw new CredenciaisUsuarioInvalidaError();
    }

    // Retorna o usuário autenticado
    return { usuario };
  }
}
