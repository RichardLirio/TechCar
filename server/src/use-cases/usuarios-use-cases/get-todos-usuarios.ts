import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Usuario } from "@prisma/client";

interface GetUsersCaseResponse {
  usuarios: Usuario[];
} // Cria uma interface para a resposta do caso de uso

export class GetAllUsersUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<GetUsersCaseResponse> {
    const usuarios = await this.usuarioRepository.findMany(); // Busca todos os usuários no repositório

    return { usuarios }; //  Retorna a lista de usuários encontrados
  }
}
