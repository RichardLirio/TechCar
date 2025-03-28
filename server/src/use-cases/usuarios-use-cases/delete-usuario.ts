import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

interface DeleteUserCaseParams {
  userId: string;
}

interface DeleteUserCaseResponse {
  usuario: Usuario;
}

export class DeleteUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    userId,
  }: DeleteUserCaseParams): Promise<DeleteUserCaseResponse> {
    const usuario = await this.usuarioRepository.deleteById(userId);

    if (!usuario) {
      throw new ResourceNotFoundError();
    }

    return { usuario };
  }
}
