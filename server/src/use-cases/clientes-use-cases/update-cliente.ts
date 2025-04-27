import { Cliente } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";

interface UpdateClienteUseCaseParams {
  id: number;
  nome: string;
  cpfCnpj: string;
  telefone: string;
  tipo?: "FISICA" | "JURIDICA" | undefined;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface UpdateClienteUseCaseResponse {
  cliente: Cliente;
} // Cria uma interface para a resposta do caso de uso

export class UpdateClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    id,
    nome,
    cpfCnpj,
    telefone,
    tipo,
  }: UpdateClienteUseCaseParams): Promise<UpdateClienteUseCaseResponse> {
    const clienteExists = await this.clienteRepository.findById(id); // Verifica se o cliente existe

    if (!clienteExists) {
      throw new ResourceNotFoundError(); // Lança um erro se o cliente não for encontrado
    }

    const ClienteWithSameCpfCnpj = await this.clienteRepository.findBycpfCnpj(
      cpfCnpj
    ); // Verifica se já existe um cliente com o mesmo cnpj

    if (ClienteWithSameCpfCnpj && ClienteWithSameCpfCnpj.id != Number(id)) {
      throw new ClientAlreadyExistsError(); // Lança um erro se o cliente já existir
    }

    const cliente = await this.clienteRepository.update({
      id,
      nome,
      cpfCnpj,
      telefone,
      tipo,
    }); // Cria um novo cliente no repositório

    return { cliente }; //Retorna o cliente atualizado
  }
}
