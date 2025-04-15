export class ServicoAlreadyExistsError extends Error {
  constructor() {
    super("Servico já existe. Favor verificar."); // Mensagem de erro personalizada
  }
}
