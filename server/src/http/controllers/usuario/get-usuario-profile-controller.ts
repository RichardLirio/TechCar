import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeGetUsuarioUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateUserParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = validateUserParamsSchema.parse(request.params);

  try {
    const getUserProfile = makeGetUsuarioUseCase();

    const { usuario } = await getUserProfile.execute({
      userId: id,
    });

    return reply.status(200).send({
      user: {
        ...usuario,
        password_hash: undefined,
      },
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(204).send();
  }
}
