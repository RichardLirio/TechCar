import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { UserAlreadyExistsError } from "@/use-cases/erros/usuario-ja-existe-erro";
import { makeUpdateUsuarioUseCase } from "@/use-cases/factories/make-update-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function UpdateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "USER"]),
  });

  const validateUserParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { name, email, password, role } = createUserBodySchema.parse(
    request.body
  );

  const { id } = validateUserParamsSchema.parse(request.params);

  try {
    const updateUserUseCase = makeUpdateUsuarioUseCase();
    const { usuario } = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      role,
    });

    return reply.code(200).send({ usuario });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }
}
