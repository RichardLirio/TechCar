import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { makeDeleteUsuarioUseCase } from "@/use-cases/factories/make-delete-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteUserParamsSchema.parse(request.params);

  try {
    const deleteUserUseCase = makeDeleteUsuarioUseCase();

    await deleteUserUseCase.execute({ userId: id });

    return reply.status(200).send({
      message: "Usuario excluido com sucesso.",
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send();
  }
}
