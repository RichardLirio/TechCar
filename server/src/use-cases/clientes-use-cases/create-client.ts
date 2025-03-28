import { Cliente } from "@prisma/client";
import { ClientRepository } from "@/repositories/client-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "../erros/cpfCnpj-invalido";
import { isValidCNPJ } from "@/utils/verify-cnpj";
import { isValidCPF } from "@/utils/verify-cpf";
import { formatCpfCnpj } from "@/value-object/CpfCnpj";

interface CreateClientUseCaseParams {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  tipo?: "FISICA" | "JURIDICA" | undefined;
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
    const cpfCnpjFormatado = await formatCpfCnpj(cpfCnpj);

    const clientWithSamecpfCnpj = await this.clientRepository.findBycpfCnpj(
      cpfCnpjFormatado
    );

    if (clientWithSamecpfCnpj) {
      throw new ClientAlreadyExistsError();
    }

    if (tipo === "FISICA" || tipo === undefined) {
      const cpfIsValid = await isValidCPF(cpfCnpjFormatado);

      if (!cpfIsValid) {
        throw new CpfCnpjInvalidError();
      }
    }

    if (tipo === "JURIDICA") {
      const cnpjIsValid = await isValidCNPJ(cpfCnpjFormatado);

      if (!cnpjIsValid) {
        throw new CpfCnpjInvalidError();
      }
    }

    const client = await this.clientRepository.create({
      nome,
      cpfCnpj: cpfCnpjFormatado,
      telefone,
      tipo,
    });

    return { client };
  }
}
