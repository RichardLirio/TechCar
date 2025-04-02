export class VeiculoAlreadyExistsError extends Error {
  constructor() {
    super("Placa de Veiculo já informada"); // Mensagem de erro personalizada
  }
}
