import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteUserCaseParams {
  userId: string;
}

interface DeleteUserCaseResponse {
  usuario: Usuario;
} // Cria uma interface para a resposta do caso de uso

export class DeleteUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    userId,
  }: DeleteUserCaseParams): Promise<DeleteUserCaseResponse> {
    // Verifica se o usuário existe
    const usuario = await this.usuarioRepository.deleteById(userId);
    // Se o usuário não existir, lança um erro
    if (!usuario) {
      throw new ResourceNotFoundError();
    }

    return { usuario }; // Retorna o usuário excluído
  }
}
