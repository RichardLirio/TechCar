import { ClienteRepository } from "@/repositories/cliente-repository";
import { Cliente } from "@prisma/client";

interface GetClientesCaseResponse {
  clientes: Cliente[];
} // Cria uma interface para a resposta do caso de uso

export class GetAllClientesUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(): Promise<GetClientesCaseResponse> {
    const clientes = await this.clienteRepository.findMany(); // Busca todos os usuários no repositório

    return { clientes }; //  Retorna a lista de usuários encontrados
  }
}
