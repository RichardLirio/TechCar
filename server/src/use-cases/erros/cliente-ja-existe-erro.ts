export class ClientAlreadyExistsError extends Error {
  constructor() {
    super("CPF ou CNPJ do cliente já informado."); // Mensagem de erro personalizada
  }
}
