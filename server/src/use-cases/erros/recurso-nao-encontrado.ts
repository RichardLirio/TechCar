export class ResourceNotFoundError extends Error {
  constructor() {
    super("Recurso soliticado não encontrado.");
  }
}
