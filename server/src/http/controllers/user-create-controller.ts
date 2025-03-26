import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateUserUseCase } from "@/use-cases/user-create";

export async function CreateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    await CreateUserUseCase({ name, email, password });
  } catch (error) {
    return reply.status(409).send();
  }
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
