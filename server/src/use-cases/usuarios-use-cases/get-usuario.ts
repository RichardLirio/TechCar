import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

interface GetUserCaseParams {
  userId: string;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetUserCaseResponse {
  usuario: Usuario;
} // Cria uma interface para a resposta do caso de uso

export class GetUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({ userId }: GetUserCaseParams): Promise<GetUserCaseResponse> {
    const usuario = await this.usuarioRepository.findById(userId); // Busca o usuário pelo ID no repositório

    if (!usuario) {
      throw new ResourceNotFoundError(); // Lança um erro se o usuário não for encontrado
    }

    return { usuario }; // Retorna o usuário encontrado
  }
}
