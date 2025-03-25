import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  await prisma.usuario.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });
}

/***model Usuario {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  password_hash String   @db.VarChar(255)
  role          Role     @default(USER)
  createdAt     DateTime @default(now())

  @@map("usuarios")
} */
