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
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface UpdateUserUseCaseResponse {
  usuario: Usuario;
} // Cria uma interface para a resposta do caso de uso

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

    const userExists = await this.usuarioRepository.findById(id); // Verifica se o usuário existe

    if (!userExists) {
      throw new ResourceNotFoundError(); // Lança um erro se o usuário não for encontrado
    }

    const userWithSameEmail = await this.usuarioRepository.findByEmail(email); // Verifica se já existe um usuário com o mesmo email

    if (userWithSameEmail && userWithSameEmail.id != id) {
      throw new UserAlreadyExistsError(); // Lança um erro se o usuário já existir
    }

    const usuario = await this.usuarioRepository.update({
      id,
      name,
      email,
      password_hash,
      role,
    }); // Cria um novo usuário no repositório

    if (!usuario) {
      throw new ResourceNotFoundError(); // Lança um erro se o usuário não for encontrado
    }

    return { usuario }; //Retorna o usuário atualizado
  }
}
