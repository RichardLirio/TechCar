import { UsuarioRepository } from "@/repositories/usuario-repository";
import { Cliente } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
/// Cria uma interface para os parâmetros de entrada do caso de uso
interface DeleteClienteUseCaseParams {
  clienteId: number;
}

interface DeleteClienteUseCaseResponse {
  cliente: Cliente;
} // Cria uma interface para a resposta do caso de uso

export class DeleteClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    clienteId,
  }: DeleteClienteUseCaseParams): Promise<DeleteClienteUseCaseResponse> {
    // Verifica se o cliente existe
    const cliente = await this.clienteRepository.deleteById(clienteId);
    // Se o cliente não existir, lança um erro
    if (!cliente) {
      throw new ResourceNotFoundError();
    }

    return { cliente }; // Retorna o cliente excluído
  }
}
