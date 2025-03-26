export class CredenciaisUsuarioInvalidaError extends Error {
  constructor() {
    super("Email ou Senha invalido(s).");
  }
}
