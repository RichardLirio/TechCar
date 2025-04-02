import { Cliente } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";

interface GetClienteCaseParams {
  clienteId: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface GetClienteCaseResponse {
  cliente: Cliente;
} // Cria uma interface para a resposta do caso de uso

export class GetClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    clienteId,
  }: GetClienteCaseParams): Promise<GetClienteCaseResponse> {
    const cliente = await this.clienteRepository.findById(clienteId); // Busca o usuário pelo ID no repositório

    if (!cliente) {
      throw new ResourceNotFoundError(); // Lança um erro se o usuário não for encontrado
    }

    return { cliente }; // Retorna o usuário encontrado
  }
}
