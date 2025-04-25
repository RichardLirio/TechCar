export class ProdutoComEstoqueInsuficienteError extends Error {
  constructor() {
    super("Produto com estoque insuficiente."); // Mensagem de erro personalizada
  }
}
