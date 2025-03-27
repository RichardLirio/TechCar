import { Cliente } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository";
import { ClientAlreadyExistsError } from "./erros/cliente-ja-existe-erro";

interface CreateClientUseCaseParams {
  nome: string;
  cpfCnpj: string;
  telefone: string;
}

interface CreateClientUseCaseResponse {
  client: Cliente;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    nome,
    cpfCnpj,
    telefone,
  }: CreateClientUseCaseParams): Promise<CreateClientUseCaseResponse> {
    const clientWithSamecpfCnpj = await this.clientRepository.findBycpfCnpj(
      cpfCnpj
    );

    if (clientWithSamecpfCnpj) {
      throw new ClientAlreadyExistsError();
    }

    const client = await this.clientRepository.create({
      nome,
      cpfCnpj,
      telefone,
    });

    return { client };
  }
}
