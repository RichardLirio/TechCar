import { Cliente } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository";
import { ClientAlreadyExistsError } from "./erros/cliente-ja-existe-erro";

interface CreateClientUseCaseParams {
  nome: string;
  cpf: string;
  telefone: string;
}

interface CreateClientUseCaseResponse {
  client: Cliente;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    nome,
    cpf,
    telefone,
  }: CreateClientUseCaseParams): Promise<CreateClientUseCaseResponse> {
    const clientWithSameCpf = await this.clientRepository.findByCpf(cpf);

    if (clientWithSameCpf) {
      throw new ClientAlreadyExistsError();
    }

    const client = await this.clientRepository.create({
      nome,
      cpf,
      telefone,
    });

    return { client };
  }
}
