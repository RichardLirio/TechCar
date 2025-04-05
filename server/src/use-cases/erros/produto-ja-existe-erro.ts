export class ProdutoAlreadyExistsError extends Error {
  constructor() {
    super("Produto já existe. Favor verificar."); // Mensagem de erro personalizada
  }
}
