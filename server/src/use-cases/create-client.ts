import { Cliente, TipoCliente } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository";
import { ClientAlreadyExistsError } from "./erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "./erros/cpfCnpj-invalido";
import { isValidCNPJ } from "@/utils/verify-cnpj";
import { isValidCPF } from "@/utils/verify-cpf";

interface CreateClientUseCaseParams {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  tipo?: TipoCliente;
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
    tipo,
  }: CreateClientUseCaseParams): Promise<CreateClientUseCaseResponse> {
    const clientWithSamecpfCnpj = await this.clientRepository.findBycpfCnpj(
      cpfCnpj
    );

    if (clientWithSamecpfCnpj) {
      throw new ClientAlreadyExistsError();
    }

    if (tipo === "FISICA" || tipo === undefined) {
      const cpfIsValid = await isValidCPF(cpfCnpj);

      if (!cpfIsValid) {
        throw new CpfCnpjInvalidError();
      }
    }

    if (tipo === "JURIDICA") {
      const cnpjIsValid = await isValidCNPJ(cpfCnpj);

      if (!cnpjIsValid) {
        throw new CpfCnpjInvalidError();
      }
    }

    const client = await this.clientRepository.create({
      nome,
      cpfCnpj,
      telefone,
      tipo,
    });

    return { client };
  }
}
