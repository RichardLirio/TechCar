export class ClientAlreadyExistsError extends Error {
  constructor() {
    super("cpfCnpj do cliente já informado."); // Mensagem de erro personalizada
  }
}
