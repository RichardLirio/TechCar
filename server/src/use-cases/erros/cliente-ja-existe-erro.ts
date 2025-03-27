export class ClientAlreadyExistsError extends Error {
  constructor() {
    super("CPF do cliente já informado.");
  }
}
