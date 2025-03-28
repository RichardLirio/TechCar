export class CpfCnpjInvalidError extends Error {
  constructor() {
    super("Cpf ou Cnpj invalido."); // Mensagem de erro personalizada
  }
}
