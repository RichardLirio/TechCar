import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUsuarioUseCase } from "@/use-cases/factories/make-create-usuario-use-case";
import { UserAlreadyExistsError } from "@/use-cases/erros/usuario-ja-existe-erro";

export async function CreateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBodySchema.parse(request.body);

  try {
    const createUsuarioUseCase = makeCreateUsuarioUseCase();
    await createUsuarioUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send();
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
