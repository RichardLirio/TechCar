export class VeiculoEClienteError extends Error {
  // Erro personalizado para quando o veículo não pertence ao cliente
  constructor() {
    super("Veículo não pertence ao cliente."); // Mensagem de erro personalizada
  }
}
