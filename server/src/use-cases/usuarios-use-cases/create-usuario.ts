import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../erros/usuario-ja-existe-erro";

interface createUserCaseParams {
  name: string;
  email: string;
  password: string;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface createUserCaseResponse {
  usuario: Usuario;
} // Cria uma interface para a resposta do caso de uso

export class CreateUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {} // Inicia o repositório de usuários
  // Método para criar um novo usuário
  async execute({
    name,
    email,
    password,
  }: createUserCaseParams): Promise<createUserCaseResponse> {
    const password_hash = await hash(password, 6); // Faz o hash da senha com 6 rounds de complexidade

    const userWithSameEmail = await this.usuarioRepository.findByEmail(email); // Verifica se já existe um usuário com o mesmo email

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(); // Lança um erro se o usuário já existir
    }

    const usuario = await this.usuarioRepository.create({
      name,
      email,
      password_hash,
    }); // Cria um novo usuário no repositório

    return { usuario }; // Retorna o usuário criado
  }
}
