import { Cliente } from "@prisma/client";
import { ClienteRepository } from "@/repositories/cliente-repository";
import { ClientAlreadyExistsError } from "../erros/cliente-ja-existe-erro";
import { CpfCnpjInvalidError } from "../erros/cpfCnpj-invalido";
import { isValidCNPJ } from "@/utils/verify-cnpj";
import { isValidCPF } from "@/utils/verify-cpf";
import { formatCpfCnpj } from "@/value-object/CpfCnpj";

interface CreateClienteUseCaseParams {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  tipo?: "FISICA" | "JURIDICA" | undefined;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateClienteUseCaseResponse {
  cliente: Cliente;
} // Cria uma interface para a resposta do caso de uso

export class CreateClienteUseCase {
  constructor(private clientRepository: ClienteRepository) {}

  async execute({
    nome,
    cpfCnpj,
    telefone,
    tipo,
  }: CreateClienteUseCaseParams): Promise<CreateClienteUseCaseResponse> {
    const cpfCnpjFormatado = await formatCpfCnpj(cpfCnpj); // Formata o CPF ou CNPJ para o padrão correto

    const clientWithSamecpfCnpj = await this.clientRepository.findBycpfCnpj(
      cpfCnpjFormatado
    ); // Verifica se já existe um cliente com o mesmo CPF ou CNPJ

    if (clientWithSamecpfCnpj) {
      throw new ClientAlreadyExistsError();
    } // Lança um erro se o cliente já existir

    if (tipo === "FISICA" || tipo === undefined) {
      // Verifica se o tipo é FISICA ou não foi informado
      const cpfIsValid = await isValidCPF(cpfCnpjFormatado); // Verifica se o CPF é válido

      if (!cpfIsValid) {
        throw new CpfCnpjInvalidError(); // Lança um erro se o CPF não for válido
      }
    }

    if (tipo === "JURIDICA") {
      // Verifica se o tipo é JURIDICA
      const cnpjIsValid = await isValidCNPJ(cpfCnpjFormatado); // Verifica se o CNPJ é válido

      if (!cnpjIsValid) {
        throw new CpfCnpjInvalidError();
      } // Lança um erro se o CNPJ não for válido
    }

    const cliente = await this.clientRepository.create({
      nome,
      cpfCnpj: cpfCnpjFormatado,
      telefone,
      tipo,
    }); // Cria um novo cliente no repositório

    return { cliente }; // Retorna o cliente criado
  }
}
