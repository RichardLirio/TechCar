import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";

interface GetUserCaseParams {
  userId: string;
}

interface GetUserCaseResponse {
  usuario: Usuario;
}

export class GetUserUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({ userId }: GetUserCaseParams): Promise<GetUserCaseResponse> {
    const usuario = await this.usuarioRepository.findById(userId);

    if (!usuario) {
      throw new ResourceNotFoundError();
    }

    return { usuario };
  }
}
