import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
/// Cria uma instância do PrismaClient com as configurações apropriadas
export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
