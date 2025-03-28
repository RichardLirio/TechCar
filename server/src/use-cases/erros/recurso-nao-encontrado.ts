export class ResourceNotFoundError extends Error {
  constructor() {
    super("Recurso soliticado não encontrado."); // Mensagem de erro personalizada
  }
}
