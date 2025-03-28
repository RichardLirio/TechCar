export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email já existe."); // Mensagem de erro personalizada
  }
}
