import { PrismaClientRepository } from "@/repositories/prisma/prisma-client-repository";
import { CreateClientUseCase } from "../create-client";

export function makeCreateClientUseCase() {
  const ClientRepository = new PrismaClientRepository();
  const createUseCase = new CreateClientUseCase(ClientRepository);

  return createUseCase;
}
