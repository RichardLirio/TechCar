import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";

interface GetUsersCaseResponse {
  usuarios: Usuario[];
}

export class GetAllUsersUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<GetUsersCaseResponse> {
    const usuarios = await this.usuarioRepository.findMany();

    return { usuarios };
  }
}
