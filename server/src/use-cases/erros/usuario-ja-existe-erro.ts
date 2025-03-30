export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email do usuário já existe."); // Mensagem de erro personalizada
  }
}
